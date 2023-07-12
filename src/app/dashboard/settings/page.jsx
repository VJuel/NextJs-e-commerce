'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";

export default function Page() {
    const [productName,setProductName] = useState('');
    const [idValue, setIdValue] = useState('');
    const [newFeature, setNewFeature] = useState('');
    const [oldFeature, setOldFeature] = useState('');

    useEffect(() => {
        axios.get('/api/settings')
            .then(res => {
                oldFeature(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [newFeature])

    async function handleSubmit(e) {
        e.preventDefault()
        axios.put('/api/settings', {
            name: productName,
            id: idValue
        })
            .then(res => {
                setNewFeature(res.data)
                setProductName('')
                setIdValue('')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleChangeName = (e) => {
        setProductName(e.target.value);
    };

    const handleChangeId = (e) => {
        setIdValue(e.target.value);
    };

    return (
        <div>
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}
                  className="flex flex-wrap mb-4">
                <label className="w-full mb-2">Add Features</label>
                <input className="w-2/3 mr-4 rounded-none mb-1" type="email" value={productName} onChange={handleChangeName} placeholder="Iphone13"/>
                <input className="w-2/3 mr-4 rounded-none" type="text" value={idValue} onChange={handleChangeId} placeholder="1234567"/>
                <button className="btn-primary w-1/3" type="submit">add feature</button>
            </form>

            <h2 className="mb-2">Feature</h2>
            <table className="!mt-2 basic">
                <tbody>
                {newFeature &&
                    <tr>
                        <td className="p-4">{newFeature.email}</td>
                        <td className="border-gray-300 border-l-2 pl-4">

                            <Link href={"/dashboard/admins/" + newFeature.id}
                                  className="flex btn-secondary">
                                Delete
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                </svg>
                            </Link>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    )
}