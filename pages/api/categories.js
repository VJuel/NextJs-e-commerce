import {Category} from "@/models/Category";
import moongooseConnect from "@/lib/moongoose";

export default async function handle(req, res) {
    const {method} = req
    await moongooseConnect()

    if (method === 'GET') {
        await res.json(await Category.find().populate('parent'))
    }

    if (method === 'PUT') {
        try {
            const {name,parentCategory,propreties,_id} = await req.body
            const categoryDoc = await Category.updateOne({_id},{
                name: name || undefined,
                parent: parentCategory || undefined,
                propreties,
            })
            res.json(categoryDoc)

        } catch (err) {
            console.log(err)
        }
    }

    if (method === 'POST') {
        try {
        const {name,parentCategory,propreties} = await req.body
        const categoryDoc = await Category.create({
            name,
            parent: parentCategory || undefined,
            propreties,
        })
        res.json(categoryDoc)

        } catch (err) {
            console.log(err)
        }
    }

    if (method === 'DELETE') {
        try {
            const {_id} = await req.query
            await Category.deleteOne({_id})
            res.json('ok')

        } catch (err) {
            console.log(err)
        }
    }
}