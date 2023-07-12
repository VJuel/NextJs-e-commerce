import {NextResponse} from "next/server";
import {Product} from "@/src/models/Product";

export async function GET (req) {
    try {
        const data = await Product.find({
            where: {
                feature: true
            }
        })
        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
    }
}

// export async function PUT(req, res) {
//     try {
//         const {email, id} = await req.json()
//         console.log(email, id)
//         await db.user.update({
//             where: {
//                 id: id
//             },
//             data: {
//                 role: "ADMIN"
//             }
//         })
//         return NextResponse.json({message: 'Role modified'})
//     } catch (err) {
//         console.log(err)
//     }
// }
