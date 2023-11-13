import { NextResponse } from "next/server"

export async function GET(req, res) {
  if (req.method !== "GET") {
    return NextResponse.json({ message: "is not a GET REQUEST" })
  }
  try {
    await mongooseConnect()
    const balance = await stripe.balance.retrieve()
    console.log(balance)
    return NextResponse.json({ balance })
  } catch (error) {
    return NextResponse.error(error)
  }
}
