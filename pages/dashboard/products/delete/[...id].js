import React, {useEffect, useState} from 'react';
import Layout from "@/components/admin/Layout";
import axios from "axios";
import {useRouter} from "next/router";
import Link from "next/link";

export default function DeleteProductPage() {
    const router = useRouter()
    const [productInfo, setProductInfo] = useState([])
    const {id} = router.query
    useEffect(() => {
        if (!id) {
            return
        }
        axios.get('/api/products?id='+id).then((res) => {
            setProductInfo(res.data)
        })
    }, [id])
        function goBack() {
            router.push('/dashboard/products')
        }
        async function deleteProduct() {
            await axios.delete('/api/products?id='+id);
            goBack()
        }

    return (
        <Layout>
            <div className="flex flex-col justify-center w-full m-auto items-center">
                <h1 className="text-2xl text-blue-800 font-medium">Do you want delete ?</h1>
                <div className="flex items-center mt-4">
                    <button className="btn-delete bg-red-500 mr-4" onClick={deleteProduct}>Yes</button>
                    <button className="btn-delete bg-blue-800" onClick={goBack}><Link href="/dashboard/products">No</Link></button>
                </div>
            </div>
        </Layout>
    );
};

