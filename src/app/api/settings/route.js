import { NextResponse } from "next/server"
import { Product } from "@/src/models/Product"
import { main } from "@/src/lib/main"
import { authorizeUser } from "@/src/lib/authorizeUser"

export async function GET(req) {
  try {
    const data = await Product.findOne({ featured: true })
    return NextResponse.json(data)
  } catch (e) {
    console.log(e)
  }
}

export async function PUT(req, res) {
  await authorizeUser()
  await main()
  try {
    const { title, id, oldId } = await req.json()
    if (oldId) {
      await Product.updateOne({ _id: oldId }, { $set: { featured: false } })
    }
    const newFeature = await Product.updateOne(
      { _id: id },
      {
        $set: {
          featured: true,
        },
      }
    )
    return NextResponse.json(newFeature)
  } catch (err) {
    console.log(err)
  }
}
