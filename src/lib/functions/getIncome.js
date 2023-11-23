import axios from "redaxios"

export async function getIncome() {
  const income = await axios
    .get(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/income`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
  return income
}
