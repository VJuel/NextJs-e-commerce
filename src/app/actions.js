"use server"

import { cookies } from "next/headers"

export async function deleteImage(data) {
  const cartId = cookies().get("cartId")?.value
  await saveToDb({ cartId, data })
}

export async function createCookieSession(user) {
  cookies().set({
    name: "session",
    value: user.email,
    httpOnly: true,
    secure: true,
  })
}
