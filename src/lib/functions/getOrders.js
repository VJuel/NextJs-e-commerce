import axios from "redaxios"

export async function getOrders() {
  const orders = await axios
    .get(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/order`, {
      next: { revalidate: 10 },
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
  return orders
}
