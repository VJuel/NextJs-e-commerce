import axios from "redaxios"

export async function getIncome() {
  const income = await axios
    .get("http://localhost:3000/api/income")
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
  return income
}
