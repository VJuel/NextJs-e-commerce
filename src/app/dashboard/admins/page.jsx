"use client"
import { useEffect, useState } from "react"
import axios from "redaxios"
import Link from "next/link"
import handleToastError from "@/src/components/Toast"
import { BtnDisabled } from "@/src/components/admin/button/BtnDisabled"

export default function Page() {
  const [admins, setAdmins] = useState([])
  const [emailValue, setEmailValue] = useState("")

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/admins`)
      .then((res) => {
        setAdmins(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    axios
      .put(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/admins`, {
        email: emailValue,
      })
      .then((res) => {
        console.log(res)
        if (res?.error === "unauthorized") {
          return <handleToastError />
        }
        setAdmins([...admins, res.data])
        setEmailValue("")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeEmail = (e) => {
    setEmailValue(e.target.value)
  }
  const handleChangeId = (e) => {
    setIdValue(e.target.value)
  }

  return (
    <div>
      <h1>Admins</h1>
      <form onSubmit={handleSubmit} className="flex flex-wrap mb-4">
        <label className="w-full mb-2">Add new Admin</label>
        <input
          className="w-2/3 mr-4 rounded-none mb-1"
          type="email"
          value={emailValue}
          onChange={handleChangeEmail}
          required={true}
          placeholder="exemple : john@doe.fr"
        />
        <BtnDisabled
          message={"Add admin"}
          path={"new"}
          className="flex btn-primary"
          svgSpecial={null}
          size={"small"}
          type="submit"
        />
      </form>

      <h2 className="mb-2">All Admins account</h2>
      <table className="!mt-2 basic">
        <tbody>
          {admins &&
            admins.map((admin, index) => (
              <tr key={index}>
                <td className="p-4">{admin.email}</td>
                <td className="border-gray-300 border-l-2 pl-4">
                  <BtnDisabled
                    message={"Delete"}
                    path={"admins/" + admin.id}
                    className="flex btn-secondary"
                    svgSpecial={"delete"}
                    size={"medium"}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
