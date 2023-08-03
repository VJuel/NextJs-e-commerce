import {NextResponse} from "next/server";
import {Order} from "@/src/models/Order";
import mongooseConnect from "@/src/lib/mongoose";
async function main() {
    try {
        await mongooseConnect()
    } catch (e) {
        console.log(e)
    }
}
export async function GET() {
    await main()
    try {
        const data = await Order.find()
        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
    }
}