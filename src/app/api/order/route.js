import { NextResponse } from "next/server"
import { Order } from "@/src/models/Order"
import mongooseConnect from "@/src/lib/mongoose"
import { main } from "@/src/lib/main"

export const dynamic = "force-dynamic"

export async function GET() {
  await main()
  try {
    const data = await Order.find()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.error(err)
  }
}
