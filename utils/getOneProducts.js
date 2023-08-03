
export default async function getOneProduct(id) {
    const res = await fetch(`http://localhost:3000/api/products/${id}`)
    return res.json()
}
