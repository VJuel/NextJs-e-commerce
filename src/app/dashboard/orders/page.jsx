import axios from "axios"

export default async function Page() {

  const orderData = await axios.get('http://localhost:3000/api/order',{ next: { revalidate: 10 } })
  .then(res => {
      return res.data
  })
  .catch(err => {
      console.log(err)
  })
  const quantity = orderData.map((el, index) => {
    return el.line_items
  })
  console.log(quantity)
    return (
      <div>
        <h1>Orders</h1>
        <table className="basic">
              <tbody>
                <tr>
                <td>
                    DATE
                  </td>
                  <td>
                    RECIPIENT
                  </td>
                  <td>
                    COMMAND
                  </td>
                </tr>
                <tr>
                 
                </tr>
        {orderData && orderData.map((el, index) => {
          let date = new Date(el.createdAt)
          return (
          <tr key={index}>
            <td>{el._id}</td>
            <td>
              <div>{el.email}</div>
                <div className="1/2">{el.city}</div>
                <div className="1/2">{el.codePostal}</div>
              <div>{el.country}</div>
                <div className="text-medium">{date.getHours()}h {date.getMinutes()}min, "{date.toDateString()}</div>
                <div className="text-medium">{date.getHours()}h {date.getMinutes()}min, "{date.toDateString()}</div>

            </td>
            <td>{el.name}</td>
          </tr>
        )})}
          </tbody>
        </table>
      </div>
  )
}