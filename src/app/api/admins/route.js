import { NextResponse } from "next/server"
import { main } from "@/src/lib/main"
import { authorizeUser } from "@/src/lib/authorizeUser"

export async function GET(req) {
  await main()
  try {
    const data = await db.user.findMany({
      where: {
        role: "ADMIN",
      },
    })
    return NextResponse.json(data)
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}

export async function PUT(req, res) {
  await main()
  await authorizeUser()
  try {
    const data = await req.json()
    await db.user.updateMany({
      where: {
        email: data.email,
      },
      data: {
        role: "ADMIN",
      },
    })
    return NextResponse.json(data)
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}
