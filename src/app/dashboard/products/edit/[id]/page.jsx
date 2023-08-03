import ProductForm from "@/src/components/admin/ProductForm";
const ObjectId = require('mongoose').Types.ObjectId;

// TODO A TEST
// import { Suspense } from 'react'
// <Suspense fallback={<p>Loading weather...</p>}>
async function getOneProduct(id) {
   
}

export default async function EditProductPage({params: {id}}) {
    const productInfo = await fetch(`http://localhost:3000/api/products/${id}`).then(res => {

        return res.json()
    })

    return (
        <>
            <h1 className="text-blue-800 font-medium text-2xl">Edit product</h1>
            {productInfo && <ProductForm {...productInfo}/>}
        </>
    );
};

