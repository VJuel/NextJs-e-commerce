import axios from "axios";
import {BtnAddToCartSecondary} from "@/src/components/front/button/BtnAddToCart";

export async function Products() {
    const data = await axios.get('http://localhost:3000/api/products', {next: {revalidate: 10}})
        .then(res => {
            return res.data.sort((a, b) => {
                return a.createdAt - b.createdAt
            })
        })
        .catch(err => {
            console.log(err)
        })
    const productData = data && data.sort((a, b) => {
        return a.createdAt - b.createdAt
    })

    return (
        <section className="bg-slate-950 p-10 flex flex-col justify-center items-center">
            <h2 className="mb-4 text-xl text-primary">New arrivals</h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
                {productData && productData.map((product, index) => {
                    return (
                        <div className="w-[32%] card py-2 bg-base-100 shadow-xl" key={index}>
                            <figure><img src={'../../assets/macbookpro.png'}
                                         alt="Shoes"/></figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.title}</h2>
                                <p>{product.description}</p>
                                <div className="card-actions justify-end items-center">
                                    <p className="w-1/2">{product.price}</p>
                                    <BtnAddToCartSecondary id={product._id}/>
                                </div>
                            </div>
                        </div>)
                })}
            </div>
        </section>
    )

}