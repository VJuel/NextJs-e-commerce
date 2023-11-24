import { NextResponse } from "next/server"
import { Product } from "@/src/models/Product"
import mongooseConnect from "@/src/lib/mongoose"
import { authorizeUser } from "@/src/lib/authorizeUser"
import { main } from "@/src/lib/main"

export async function DELETE(request, { params }) {
  await main()
  await authorizeUser()
  try {
    const { id } = params
    await Product.deleteOne({ _id: id })
    return NextResponse.json({ message: "deleted" })
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}

export async function GET(req, { params }) {
  await main()
  const { id } = params
  try {
    const data = await Product.findById(id)
    return NextResponse.json(data)
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}
