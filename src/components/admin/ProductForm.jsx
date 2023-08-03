'use client'
import {useRouter} from "next/navigation";
import axios from "axios";
import {useEffect, useState} from "react";
import {ClipLoader} from "react-spinners";
import {ReactSortable} from "react-sortablejs";
import "@uploadthing/react/styles.css";
import { useUploadThing } from "@/utils/uploadthing";
import { UploadButton } from "@/utils/uploadthing";

const mongoose = require('mongoose');


export default function ProductForm({
                                        _id,
                                        title: existingTitle,
                                        description: existingDescription,
                                        price: existingPrice,
                                        images: existingImages,
                                        category: assignedCategory,
                                        featured: assignedFeatures,
                                        // properties:assignedProperties
                                    }) {
    // const [productInfo, setProductInfo] = useState({} || undefined)
    const [title, setTitle] = useState(existingTitle || '')
    const [description, setDescription] = useState(existingDescription || '')
    const [price, setPrice] = useState(existingPrice || '')
    const [images, setImages] = useState(existingImages || [])
    const [category, setCategory] = useState(assignedCategory || '')
    const [categories, setCategories] = useState([] || undefined)
    const [featured, setFeatured] = useState(assignedFeatures || false)
    // const [productPropreties, setProductProperties] = useState({} || assignedProreties)
    const [goToProducts, setGoToProducts] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const router = useRouter()
    const ObjectId = mongoose.Types.ObjectId;

    useEffect(() => {
        getCategories()
    }, []);

    function getCategories() {
        axios.get('/api/categories', {next: {revalidate: 10}})
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    async function isValidObjectId(id) {
        const product = {title, description, price, images, category, featured, id}
        const idDate = new ObjectId(id).toString()
        if (idDate === id) {
            return await axios.put('/api/products', product);
        } else {
            return await axios.post('/api/products', product)
        }
    }

    function setImageUrl(url) {
        setImages(oldImages => {
            return [...oldImages, url]
          }
        )
    }

    async function saveProduct(e) {
        e.preventDefault()
        await isValidObjectId(_id)
        router.push('/dashboard/products')
    }

    function updateImagesOrder(images) {
        setImages(images)
    }

    return (
        <form onSubmit={saveProduct}>
            <div className="flex flex-col">
                <label className="">Product name</label>
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
                <label>
                    Photos
                </label>
                <div className="mt2 flex justify-start items-center gap-4 h-full flex-wrap md:flex-nowrap">
                    <ReactSortable className="flex items-center gap-2 flex-wrap md:flex-nowrap" list={images}
                                   setList={updateImagesOrder}>
                        {!!images?.length ? images.map(link => (
                            <div key={link} className="w-auto h-24 flex p-2">
                                <img className="h-full object-cover" src={link} alt="product img"/>
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
                    
                    <UploadButton   endpoint="imageUploader"
                                    onUploadProgress={(res) => {
                                        setIsUploading(true)
                                }}
                                    onClientUploadComplete={(res) => {
                                        setIsUploading(false)
                                        const newUrl = res[0].fileUrl
                                        return setImageUrl(newUrl)
                                }}
                            onUploadError={(error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                            }}
                    />
                </div>
                <label>Description</label>
                <textarea name="description"
                          placeholder="Description"
                          value={description}
                          onChange={el => setDescription(el.target.value)}></textarea>
                <label>Price in (USD)</label>
                <input className="mb-4" type="number" min="0" placeholder="Price" value={price}
                       onChange={el => setPrice(Number(el.target.value))}/>
                <button type="submit"
                        className="btn-primary">Save
                </button>
            </div>
        </form>
    )
}