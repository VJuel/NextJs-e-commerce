import {NextResponse} from "next/server";
// import db from "@/src/lib/db";
// const Users = mongoose.model.users;*

export async function GET(req) {
    try {
        // const collections = await db.().toArray();
        // const collectionNames = await collections.map((collection) => collection.name);

        const data = await db.user.findMany({
            where: {
                role: "ADMIN"
            }
        })
        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
    }
}

export async function PUT(req, res) {
    try {
        const data = await req.json()
        await db.user.updateMany({
            where: {
                id: data.id
            },
            data: {
                role: "ADMIN"
            }
        })
        return NextResponse.json(data)
    } catch (err) {
        console.log(err)
    }
}
