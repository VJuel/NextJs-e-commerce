import React from 'react';
import mongooseConnect from "@/lib/moongoose";
import {Product} from "@/models/Product";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect()
    // await isAdminRequest(req,res);

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Product.findOne({_id: req.query.id}))
        } else {
            res.json(await Product.find())
        }
    }

    if (method === 'POST') {
        const {title, description, price, category, images} = req.body
        const productDoc = await Product.create({
            title, description, price, category, images
        })
        res.json(productDoc)
    }

    if (method === 'PUT') {
        const {title, description, price, _id, category, images} = req.body;
        await Product.updateOne({ _id }, { $set: { category: '' } })
        await Product.updateOne({_id}, {title, description, price, category, images});
        res.json(Product)
    }


    if (method === 'DELETE') {
        if (req.query?.id) {
            await Product.deleteOne({_id: req.query?.id})
            res.json(true)
        }
    }
}
;

