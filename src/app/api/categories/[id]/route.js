import { Category } from "@/src/models/Category"
import { NextResponse } from "next/server"
import { main } from "@/src/lib/main"
export const dynamic = "force-dynamic"

export async function DELETE(request, { params }) {
  await main()
  try {
    // const {_id} = await request.json();
    const { id } = params
    await Category.deleteOne({ _id: id })
    return NextResponse.json({ message: "deleted" })
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}
