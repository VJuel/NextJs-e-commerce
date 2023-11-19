"use client"
import { useRouter } from "next/navigation"
import axios from "redaxios"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { ReactSortable } from "react-sortablejs"
import "@uploadthing/react/styles.css"
import { useUploadThing } from "@/utils/uploadthing"
import { UploadButton } from "@/utils/uploadthing"
import { utapi } from "uploadthing/server"
import Image from "next/image"

const mongoose = require("mongoose")

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
  const [title, setTitle] = useState(existingTitle || "")
  const [description, setDescription] = useState(existingDescription || "")
  const [price, setPrice] = useState(existingPrice || "")
  const [images, setImages] = useState(existingImages || [])
  const [category, setCategory] = useState(assignedCategory || "")
  const [categories, setCategories] = useState([] || undefined)
  const [featured, setFeatured] = useState(assignedFeatures || false)
  // const [productPropreties, setProductProperties] = useState({} || assignedProreties)
  const [goToProducts, setGoToProducts] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()
  const ObjectId = mongoose.Types.ObjectId

  useEffect(() => {
    getCategories()
  }, [])

  function getCategories() {
    axios
      .get("/api/categories", { next: { revalidate: 10 } })
      .then((res) => {
        setCategories(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function isValidObjectId(id) {
    const product = {
      title,
      description,
      price,
      images,
      category,
      featured,
      id,
    }
    const idDate = new ObjectId(id).toString()
    if (idDate === id) {
      return await axios.put("/api/products", product)
    } else {
      return await axios.post("/api/products", product)
    }
  }

  function setImageUrl(url) {
    setImages((oldImages) => {
      return [...oldImages, url]
    })
  }

  async function saveProduct(e) {
    e.preventDefault()
    await isValidObjectId(_id)
    router.push("/dashboard/products")
  }

  function updateImagesOrder(images) {
    setImages(images)
  }

  //  async function deleteImage(imageSrc) {
  //  await utapi.deleteFiles(imageSrc);
  //}

  async function uploadFiles(formData) {
    const files = fd.getAll("files")
    const response = await utapi.uploadFiles(files)
    //    ^? { key: string, url: string }[]
  }

  return (
    <form onSubmit={saveProduct}>
      <div className="flex flex-col">
        <label className="">Product name</label>
        <input
          type="text"
          placeholder="Product name"
          value={title}
          onChange={(el) => setTitle(el.target.value)}
        />
        <label>Category</label>
        <select
          className="py-2"
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="">Uncategorized</option>
          {categories.length > 0 &&
            categories.map((category, index) => (
              <option key={index}>{category.name}</option>
            ))}
        </select>
        <label>Photos</label>
        <div className="mt2 flex justify-start items-center gap-4 h-full flex-wrap md:flex-nowrap">
          <ReactSortable
            className="flex items-center gap-2 flex-wrap md:flex-nowrap"
            list={images}
            setList={updateImagesOrder}
          >
            {!!images?.length ? (
              images.map((link) => (
                //TODO: delete image
                <div
                  key={link}
                  onClick={() => deleteImage(link)}
                  className="transition-all relative w-fit h-24 flex [&>div]:hover:flex [&>div]:hover:h-full cursor-pointer radius-xs overflow-hidden"
                >
                  <Image
                    width={100}
                    height={100}
                    className="h-full object-cover w-full"
                    src={link}
                    alt="product img"
                  />
                  <div
                    className={`z-1 absolute justify-center items-center w-full bg-red-400 opacity-30 h-0 hover:h-full hover cursor-pointer hidden`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill=""
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#fff"
                      className="-transform-x-1/2 -transform-y-1/2 w-10 h-10 z-10 absolute-translate"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              ))
            ) : (
              <div className="mt-4">No photos in this product</div>
            )}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 flex items-center">
              <ClipLoader color="#36d7b7" />
            </div>
          )}

          <UploadButton
            endpoint="imageUploader"
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
              alert(`ERROR! ${error.message}`)
            }}
          />
        </div>
        <label>Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(el) => setDescription(el.target.value)}
        ></textarea>
        <label>Price in (USD)</label>
        <input
          className="mb-4"
          type="number"
          min="0"
          placeholder="Price"
          value={price}
          onChange={(el) => setPrice(Number(el.target.value))}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </div>
    </form>
  )
}
