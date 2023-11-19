import { NextResponse } from "next/server"
import { Product } from "@/src/models/Product"
import mongooseConnect from "@/src/lib/mongoose"
import authorizeUser from "@/src/lib/authorizeUser"

async function main() {
  try {
    await mongooseConnect()
  } catch (e) {
    console.log(e)
  }
}

export async function DELETE(request, { params }) {
  await main()
  await authorizeUser()
  try {
    const { id } = params
    await Product.deleteOne({ _id: id })
    return NextResponse.json({ message: "deleted" })
  } catch (err) {
    console.log(err)
  }
}

export async function GET(req, { params }) {
  await main()
  const { id } = params
  try {
    const data = await Product.findById(id)
    return NextResponse.json(data)
  } catch (e) {
    console.log(e)
  }
}
