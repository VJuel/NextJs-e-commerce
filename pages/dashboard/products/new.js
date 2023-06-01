import React, {useEffect, useState} from 'react';
import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function NewProduct() {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductInfo(response.data);
        });
    }, [id]);
    return (
        <Layout>
            <h1 className="text-blue-800 font-medium text-2xl">New product</h1>
            <ProductForm/>
        </Layout>
    );
};

