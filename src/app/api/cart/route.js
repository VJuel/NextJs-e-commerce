import { Product } from "@/src/models/Product"
import { NextResponse } from "next/server"
import mongooseConnect from "@/src/lib/mongoose"
import { main } from "@/src/lib/main"
import { authorizeUser } from "@/src/lib/authorizeUser"

export const dynamic = "force-dynamic"

export async function POST(req, res) {
  await main()
  await authorizeUser()
  try {
    const ids = await req.json()
    const data = await Product.find({ _id: { $in: ids } })
    return NextResponse.json(data)
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}
