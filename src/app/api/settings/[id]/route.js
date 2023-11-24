import { NextResponse } from "next/server"
import { main } from "@/src/lib/main"
import { authorizeUser } from "@/src/lib/authorizeUser"

export async function PUT(request, { params }) {
  await authorizeUser()
  await main()
  try {
    await db.user.update({
      where: {
        id: params.id,
      },
      data: {
        role: "USER",
      },
    })
    return NextResponse.json({ message: "Role modified" })
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}

export async function GET(req, { params }) {
  await main()
  const id = params.id
  try {
    const data = await db.user.findUnique({
      where: { id },
    })
    return NextResponse.json(data)
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}
