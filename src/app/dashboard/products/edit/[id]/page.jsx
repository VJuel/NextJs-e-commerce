'use client'
import ProductForm from "@/src/components/admin/ProductForm";
import axios from "axios";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
const ObjectId = require('mongoose').Types.ObjectId;

// TODO A TEST
// import { Suspense } from 'react'
// <Suspense fallback={<p>Loading weather...</p>}>

export default function EditProductPage() {
    const [productInfo, setProductInfo] = useState();
    const {id} = useParams();

    useEffect(() => {
        isValidObjectId()
    }, [id])

     function isValidObjectId() {
        const idDate = new ObjectId(id).toString()
        if (idDate === id) {
            axios.get(`/api/products/${id}`).then(response => {
                setProductInfo(response.data);
            });
        } else {
            console.log("not valid id")
        }
    }

    return (
        <>
            <h1 className="text-blue-800 font-medium text-2xl">Edit product</h1>
            {productInfo && <ProductForm {...productInfo}/>}
        </>
    );
};

