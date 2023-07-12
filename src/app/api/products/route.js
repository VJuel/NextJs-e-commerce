import React from 'react';
import mongooseConnect from "@/src/lib/moongoose";
import {Product} from "@/src/models/Product";
import {NextResponse} from "next/server";

async function main() {
    try {
        await mongooseConnect()
    } catch (e) {
        console.log(e)
    }
}

export async function GET () {
    await main()
    try {
        const data = await Product.find()
        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
    }
}

//new
// export async function POST (req, res) {
//     await main()
//     const {email} = await req.json();
//     const productDoc = await Product.create({
//         title, description, price, category, images
//     })
//     return NextResponse.json(productDoc)
// }

export async function PUT(req, res) {
    const {title, description, price, _id, category, images} = await req.json();
    await Product.updateOne({_id}, {$set: {category: ''}})
    await Product.updateOne({_id}, {title, description, price, category, images});
    return NextResponse.json(Product)
}






