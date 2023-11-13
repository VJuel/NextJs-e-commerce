import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import db from "@/src/lib/db"

export async function POST(req, res) {
  const formData = await req.formData()
  let email = formData.get("email")
  let password = formData.get("password")
  let isExistingUser = true

  const user = await db.user.findUnique({
    where: { email },
  })

  //login
  const hashedPassword = await bcrypt.hash(password, 10)
  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  if (!user) {
    isExistingUser = false
    return NextResponse.json({ isExistingUser })
  }

  return NextResponse.json({ message: "login", user })
}
