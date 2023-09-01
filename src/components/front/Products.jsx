import SearchBar from "@/src/components/front/SearchBar"
import Link from "next/link"

export async function Products() {
  const productsData = await fetch(`http://localhost:3000/api/products`).then(res => {
    return res.json()
    })
    return (
        <section className="p-10 flex flex-col justify-center items-center">
            <div className="flex justify-center items-center gap-4 mb-6">
                <h2 className="mb-4 text-xl text-white">
                    Last products
                </h2>
            </div>
            <SearchBar productsData={productsData}/>
            <div className="w-full justify-center flex gap-2 mt-6 items-center">
                <Link href="/homepage/products" className="gap-2 text-white text-center underline whitespace-nowrap inline-flex">See more 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mt-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </Link>
             </div>
        </section>
    )

}