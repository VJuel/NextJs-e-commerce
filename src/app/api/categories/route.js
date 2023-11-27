import { Category } from "@/src/models/Category"
import { NextResponse, NextRequest } from "next/server"
import { main } from "@/src/lib/main"

export const dynamic = "force-dynamic"

export async function GET(req, res) {
  await main()
  try {
    const data = await Category.find().populate("parent")
    return NextResponse.json(data)
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}

export async function PUT(req, res) {
  await main()
  try {
    const { name, parentCategory, propreties, _id } = await req.json()
    const categoryDoc = await Category.updateOne(
      { _id },
      {
        name: name || undefined,
        parent: parentCategory || undefined,
        propreties,
      }
    )
    return new NextResponse(categoryDoc)
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}
export async function POST(req, res) {
  try {
    const { name, parentCategory, propreties } = await req.json()
    const categoryDoc = await Category.create({
      name: name || undefined,
      parent: parentCategory || undefined,
      propreties: propreties || undefined,
    })
    return new NextResponse(categoryDoc)
  } catch (err) {
    console.log(err)
    return NextResponse.error()
  }
}
