import {useRouter} from "next/router";
import axios from "axios";
import {useEffect, useState} from "react";
import {ClipLoader} from "react-spinners";
import {ReactSortable} from "react-sortablejs";
import mongoose from "mongoose";

const ObjectId = require('mongoose').Types.ObjectId;

export default function ProductForm({
                                        _id,
                                        title: existingTitle,
                                        description: existingDescription,
                                        price: existingPrice,
                                        images: existingImages,
                                        category: assignedCategories,
                                        propreties: assignedProreties,
                                    }) {
    const [title, setTitle] = useState(existingTitle || '')
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [images, setImages] = useState(existingImages || [])
    const [category, setCategory] = useState(assignedCategories || '')
    const [categories, setCategories] = useState([] || undefined)
    const [productPropreties, setProductProperties] = useState({} || assignedProreties)
    const [goToProducts, setGoToProducts] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
        })
    }, [])

    async function isValidObjectId(id) {
        const data = {title, description, price, images, category}
        const idDate = new ObjectId(id).toString()
        if (idDate === id) {
            return await axios.put('/api/products', {...data, _id});
        } else {
            //create
            return await axios.post('/api/products', data)
        }
    }


    async function saveProduct(e) {
        e.preventDefault()
        await isValidObjectId(_id)
        setGoToProducts(true)
    }

    if (goToProducts) {
        router.push('/dashboard/products')
    }

    async function uploadImages(ev) {
        const files = ev.target?.files;
        setIsUploading(true)
        if (files.length > 0) {
            const formData = new FormData()
            for (const file of files) {
                await formData.append('file', file)
            }
            try {
                const res = await axios.post('/api/upload', formData);
                setImages(oldImages => {
                    return [...oldImages, ...res.data.links];
                });
                setIsUploading(false)
            } catch
                (err) {
                console.log('Error uploading file:', err)
            }
        }
    }

    function updateImagesOrder(images) {
        setImages(images)
    }


    function setProductProps(propName, value) {
        setProductProperties(prev => {
            const newProductProps = {...prev}
            newProductProps[propName] = value;
            return newProductProps
        })
    }


    const propretiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({_id}) => _id === category);
        console.log(categories.find(({_id}) => _id === category))
        propretiesToFill.push(...catInfo?.propreties);
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
            propretiesToFill.push(...parentCat.propreties);
            console.log(propretiesToFill);
            catInfo = parentCat;
        }
    }

    return (
        <form onSubmit={saveProduct}>
            <div className="flex flex-col">
                <label>Product name</label>
                <input type="text" placeholder="Product name"
                       value={title}
                       onChange={el => setTitle(el.target.value)}/>
                <label>Category</label>
                <select className="py-2"
                        value={category}
                        onChange={ev => setCategory(ev.target.value)}>
                    <option value="">Uncategorized</option>
                    {categories.length > 0 && categories.map((category, index) => (
                        <option key={index}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {propretiesToFill.length > 0 && propretiesToFill.map(p => (
                    <div className="flex gap-1">
                        <div>{p.name}</div>
                        <select onChange={ev =>
                            setProductProps(p.name, ev.target.value)}>
                            {p.values.map(v => (
                                <option value={v}>{v}</option>
                            ))}
                        </select>
                    </div>
                ))}
                <label>
                    Photos
                </label>
                <div className="mt2 flex justify-start items-center gap-4 h-full">
                    <ReactSortable className="flex items-center gap-2" list={images} setList={updateImagesOrder}>
                        {!!images?.length ? images.map(link => (
                            <div key={link} className="w-20 h-full flex">
                                <img className="h-full object-cover rounded-lg" src={link} alt="product img"/>
                            </div>
                        )) : (
                            <div className="mt-4">No photos in this product</div>
                        )}
                    </ReactSortable>
                    {isUploading && (
                        <div className="h-24 flex items-center">
                            <ClipLoader color="#36d7b7"/>
                        </div>
                    )}
                    <label
                        className="bg-gray-200 w-1/3 flex items-center justify-center rounded-lg py-10 cursor-pointer border-gray-600 border-2 gap-2"
                    >
                        <span className="">Upload</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"/>
                        </svg>

                        <input type="file" onChange={uploadImages} className="hidden"/>
                    </label>
                </div>
                <label>Description</label>
                <textarea name="description"
                          placeholder="Description"
                          value={description}
                          onChange={el => setDescription(el.target.value)}></textarea>
                <label>Price in (USD)</label>
                <input className="mb-4" type="number" min="0" placeholder="Price" value={price}
                       onChange={el => setPrice(el.target.value)}/>
                <button type="submit"
                        className="btn-primary">Save
                </button>
            </div>
        </form>
    )
}