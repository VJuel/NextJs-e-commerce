import React, {useEffect, useState} from 'react';
import Layout from "@/components/admin/Layout";
import axios from "axios";
import ProductForm from "@/components/admin/ProductForm";
import {useRouter} from "next/router";

export default function EditProductPage()  {
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
             <h1 className="text-blue-800 font-medium text-2xl">Edit product</h1>
            {productInfo && (
                <ProductForm {...productInfo} />
            )}
        </Layout>
    );
};

