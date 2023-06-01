'use client'
import React, {useEffect, useState} from 'react';
import Layout from "@/components/Layout";
import Link from "next/link";
import axios from "axios";
import {ClipLoader} from "react-spinners";

export default function Products() {
    const [productData, setProductData] = useState()
    const [isUploading, setIsUploading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
            setIsUploading(true)
            setIsLoading(true)
            axios.get('/api/products').then(response => {
                setProductData(response.data)
            })
            setIsUploading(false)
            setIsLoading(false)
        }, []
    )
    return (
        <Layout>
            <h1 className="title-dashboard mb-2">Products</h1>

            <Link href="/dashboard/products/new"
                  className="bg-blue-800 text-white p-2 rounded-lg font-bold">
                Add newproduct
            </Link>
            {isLoading ? (
                <table className="table-skelton">
                    <tbody>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            ) : (
                <table className='basic mt-2'>
                    <thead className="border-2 border-blue-800">
                    <tr>
                        <td className="text-2xl">Product name</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {isUploading && (
                        <div className="h-24 flex items-center">
                            <ClipLoader color="#36d7b7" />
                        </div>
                    )}
                    {productData?.map(product => (
                        <tr key={product._id}>
                            <td className="w-1/2 pl-2">{product.title}</td>
                            <td className="p-2 flex gap-2">
                                <Link href={"/dashboard/products/edit/" + product._id}
                                      className="flex bg-blue-800 gap-2 p-2 rounded-lg text-white ">
                                    Edit
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                    </svg>
                                </Link>
                                <Link href={"/dashboard/products/delete/" + product._id}
                                      className="flex bg-blue-800 gap-2 p-2 rounded-lg text-white ">
                                    Delete
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                    </svg>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            )}
        </Layout>
    );
}
;

