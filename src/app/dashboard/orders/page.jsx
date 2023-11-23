import axios from "redaxios"
import clsx from "clsx"

export default async function Page() {
  const orderData = await axios
    .get(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/order`) //, { next: { revalidate: 30 } })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })

  const quantity = orderData.map((el, index) => {
    return el.line_items
  })

  return (
    <div>
      <h1>Orders</h1>
      <table className="basic">
        <tbody>
          <tr>
            <td>DATE</td>
            <td>PAID</td>
            <td>RECIPIENT</td>
            <td>COMMAND</td>
          </tr>
          <tr></tr>
          {orderData &&
            orderData?.map((el, index) => {
              let date = new Date(el.createdAt)
              return (
                <tr key={index}>
                  <td>{el._id}</td>
                  <td
                    className={clsx(
                      el.paid ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {el.paid ? "YES" : "NO"}
                  </td>
                  <td>
                    <div>{el.email}</div>
                    <div className="1/2">{el.city}</div>
                    <div className="1/2">{el.codePostal}</div>
                    <div>{el.country}</div>
                    <div className="text-medium">
                      {date.getHours()}h {date.getMinutes()}min,
                      {date.toDateString()}
                    </div>
                    <div className="text-medium">
                      {date.getHours()}h {date.getMinutes()}min,
                      {date.toDateString()}
                    </div>
                  </td>
                  <td>{el.name}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
