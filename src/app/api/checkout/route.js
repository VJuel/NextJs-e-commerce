import mongooseConnect from "@/src/lib/mongoose"
import { Product } from "@/src/models/Product"
import { NextResponse } from "next/server"
import { Order } from "@/src/models/Order"
import { metadata } from "../../head"
const stripe = require("stripe")(process.env.STRIPE_SK)

export async function POST(req, res) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "is not a POST REQUEST" })
  }
  try {
    await mongooseConnect()
    let data = await req.json()
    const {
      name,
      email,
      codePostal,
      city,
      streetAdress,
      country,
      cartProducts,
    } = data
    const productsIds = await cartProducts
    const uniqueIds = [...new Set(productsIds)]
    const productsInfos = await Product.find({ _id: uniqueIds })
    let line_items = []
    for (const productId of uniqueIds) {
      const productInfos = productsInfos.find(
        (product) => product._id.toString() === productId
      )
      const quantity = productsIds.filter((id) => id == productId).length || 0
      if (quantity > 0 && productInfos) {
        line_items.push({
          quantity: quantity,
          price_data: {
            currency: "USD",
            product_data: {
              name: productInfos.title,
            },
            unit_amount: productInfos.price * 100,
          },
        })
      }
    }

    const orderDoc = await Order.create({
      line_items,
      name,
      email,
      city,
      codePostal,
      streetAdress,
      country,
      paid: false,
    })

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url:
        process.env.NEXT_PUBLIC_VERCEL_URL + "/homepage/cart?success=1",
      cancel_url:
        process.env.NEXT_PUBLIC_VERCEL_URL + "/homepage/cart?success=1",
      metadata: { orederId: orderDoc._id.toString() },
    })

    return NextResponse.json({ data: session.url })
  } catch (err) {
    return console.log(err, "error stripe management redirect")
  }
}
