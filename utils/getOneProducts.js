export default async function getOneProduct(id) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + `/api/products/${id}`
  )
  return res.json()
}
