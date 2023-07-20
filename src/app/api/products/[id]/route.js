import {NextResponse} from "next/server";
import {Product} from "@/src/models/Product";
import mongooseConnect from "@/src/lib/mongoose";

async function main() {
    try {
        await mongooseConnect()
    } catch (e) {
        console.log(e)
    }
}

export async function DELETE(request, {params}) {
    await main()
    try {
        const {id} = params;
        await Product.deleteOne({_id: id})
        return NextResponse.json({message: 'deleted'})
    } catch (err) {
        console.log(err)
    }
}

export async function GET(req, {params}) {
    await main()
    // const url = new URL(req.url)
    // const id = url.searchParams.get("id")
    const {id} = params;
    try {
        const data = await Product.findById(id)
        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
    }
}