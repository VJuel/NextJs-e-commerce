import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { NextResponse } from "next/server"

export async function authorizeUser() {
  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email
  if (userEmail === "johndoe@gmail.com") {
    throw new Error("unauthorized")
  }
  return true
}
