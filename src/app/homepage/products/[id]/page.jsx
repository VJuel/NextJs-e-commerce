
import {BtnAddToCartSecondary} from "@/src/components/front/button/BtnAddToCart";




export default async function ProductDetail ({params}) {
   const id = params.id
   const productData = await getOneProduct(id)

   async function getOneProduct(id) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`)
    return res.json()
}

  return (
    <div className='flex w-full justify-center bg-grey-100 py-10'>
        <div className="px-4 flex max-w-5xl gap-8">
            <div className="w-1/2 flex-col justify-center items-center">
                <h1 className="pb-4 text-3xl">{productData.title}</h1>
                <p className="text-lg mb-4">{productData.description}</p>
                <BtnAddToCartSecondary id={id}/>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <img src={productData.images[0]} alt={productData.title}/>
            </div>
        </div>
    </div>
  )
}
