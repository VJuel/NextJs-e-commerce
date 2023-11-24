import mongooseConnect from "@/src/lib/mongoose"
import { NextResponse } from "next/server"

export async function main() {
  try {
    await mongooseConnect()
  } catch (e) {
    console.log(e)
    return NextResponse.error()
  }
}
