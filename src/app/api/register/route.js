import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req, res) {
  const formData = await req.formData()
  let email = formData.get("email")
  let password = formData.get("password")
  let isExistingUser = false

  const user = await db.user.findUnique({
    where: { email },
  })

  if (user) {
    isExistingUser = true
    return NextResponse.json({ isExistingUser })
  }

  //if !user
  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ message: "User created", isExistingUser })
}
