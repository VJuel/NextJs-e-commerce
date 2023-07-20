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
export async function GET(req) {
    await main()
    try {
        const data = await Product.findOne({featured: true})
        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
    }
}

export async function PUT(req, res) {
    await main()
    try {
        const {title, id, oldId} = await req.json()
        console.log(oldId)
        if (oldId) {
            await Product.updateOne({ _id: oldId }, { $set: { featured: false } })
        }
        const newFeature = await Product.updateOne({_id: id}, {
            $set: {
                featured: true,
            }
    })
        return NextResponse.json(newFeature)
    } catch (err) {
        console.log(err)
    }
}
