import SearchBar from "@/src/components/front/SearchBar"

export async function Products() {
  const productsData = await fetch(`http://localhost:3000/api/products`).then(res => {
    return res.json()
    })
    return (
        <section className="p-10 flex flex-col justify-center items-center">
            <div className="flex justify-center items-center gap-4 mb-6">
                <h2 className="mb-4 text-x text-white">
                    All Products
                </h2>
            </div>
            <SearchBar productsData={productsData}/>
            
        </section>
    )

}