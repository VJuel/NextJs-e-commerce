'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";

export default function Page() {
    const [productName, setProductName] = useState('');
    const [idValue, setIdValue] = useState('');
    const [newFeatured, setNewFeatured] = useState();
    const [oldFeatured, setOldFeatured] = useState();

    useEffect(() => {
        getFeatured()
    }, [])

    function getFeatured() {
        axios.get('/api/settings')
            .then(res=> {
                setOldFeatured(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function handleSubmit(e) {
        e.preventDefault()
        axios.put('/api/settings', {
            title: productName,
            id: idValue,
            oldId: oldFeatured ? oldFeatured._id : undefined
        })
            .then(res => {
                setNewFeatured(res.data)
                setProductName('')
                setIdValue('')
                setOldFeatured([])
                getFeatured()
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
                <input className="w-2/3 mr-4 rounded-none mb-1" type="text" value={productName}
                       onChange={handleChangeName} placeholder="Product name : Iphone13"/>
                <input className="w-2/3 mr-4 rounded-none" type="text" value={idValue} onChange={handleChangeId}
                       placeholder="id : 1234567.."/>
                <button className="btn-primary w-1/3" type="submit">add feature</button>
            </form>

            <h2 className="mb-2">Featured</h2>
            <table className="!mt-2 basic">
                <tbody>
                {oldFeatured &&
                    <tr>
                        <td className="p-4">{oldFeatured.title}</td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    )
}