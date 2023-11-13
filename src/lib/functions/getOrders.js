import axios from "redaxios"

export async function getOrders() {
  const orders = await axios
    .get("http://localhost:3000/api/order", { next: { revalidate: 10 } })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
  return orders
}
