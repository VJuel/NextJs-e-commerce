import {Product} from "@/src/models/Product";
import {NextResponse} from "next/server";
import mongooseConnect from "@/src/lib/mongoose";

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
        const data = await Product.find({featured: true})
        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
    }
}