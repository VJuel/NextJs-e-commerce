import {Category} from "@/src/models/Category";
import {NextResponse} from "next/server";

export async function DELETE (request, {params}) {
    try {
        // const {_id} = await request.json();
        const {id} = params;
        await Category.deleteOne({_id: id})
        return NextResponse.json({message: 'deleted'})
    } catch (err) {
        console.log(err)
    }
}