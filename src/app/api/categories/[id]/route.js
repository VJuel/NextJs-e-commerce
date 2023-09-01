import {Category} from "@/src/models/Category";
import {NextResponse} from "next/server";
import mongooseConnect from "@/src/lib/mongoose";
import {Product} from "@/src/models/Product";

async function main() {
    try {
        await mongooseConnect()
    } catch (e) {
        console.log(e)
    }
}

export async function DELETE (request, {params}) {
    await main()
    try {
        // const {_id} = await request.json();
        const {id} = params;
        await Category.deleteOne({_id: id})
        return NextResponse.json({message: 'deleted'})
    } catch (err) {
        console.log(err)
    }
}

