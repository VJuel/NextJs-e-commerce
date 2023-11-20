import mongooseConnect from "@/src/lib/mongoose"
import { NextResponse } from "next/server"
const stripe = require("stripe")(process.env.STRIPE_SK)
import { Order } from "@/src/models/Order"
import { buffer } from "micro"

const endpointSecret =
  "whsec_ac119e4862af7eb8c5f9d978784ae3a5dff519f5431338dcc48f64a927b9ebd0"

export async function POST(req, res) {
  await mongooseConnect()

  const sig = req.headers["stripe-signature"]

  let event

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    )
  } catch (err) {
    return NextResponse.json({ message: `Webhook Error: ${err.message}` })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object
      const orderId = data.metadata.orderId
      const paid = data.payment_status === "paid"
      if (orderId && paid) {
        await Order.updateOne({ _id: orderId }, { $set: { paid: true } })
      }
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send()
}

// export const config = {
//   api: { bodyParser: false },
// }
