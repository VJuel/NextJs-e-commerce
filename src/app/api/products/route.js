import React from "react"
import mongooseConnect from "@/src/lib/mongoose"
import { Product } from "@/src/models/Product"
import { NextResponse } from "next/server"
import { main } from "@/src/lib/main"

export const dynamic = "force-dynamic"

export async function GET() {
  await main()
  try {
    const data = await Product.find()
    return NextResponse.json(data)
  } catch (e) {
    console.log(e)
    return NextResponse.error()
  }
}

export async function POST(req, res) {
  await main()
  const { title, description, price, category, images } = await req.json()
  const productDoc = await Product.create({
    title,
    description,
    price,
    category,
    images,
  })
  return NextResponse.json(productDoc)
}

export async function PUT(req, res) {
  const { title, description, price, id, category, images } = await req.json()
  await Product.updateOne({ _id: id }, { $set: { category: "" } })
  const product = await Product.updateOne(
    { _id: id },
    {
      title: title,
      description: description,
      price: price,
      category: category,
      images: images,
    }
  )
  return NextResponse.json(product)
}
