import { Product } from "@/src/models/Product"
import { NextResponse } from "next/server"
import { main } from "@/src/lib/main"

export async function GET() {
  await main()
  try {
    const data = await Product.find({ featured: true })
    return NextResponse.json(data)
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}
