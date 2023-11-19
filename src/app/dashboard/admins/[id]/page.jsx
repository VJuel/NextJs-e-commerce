"use client"
import React, { useEffect, useState } from "react"
import axios from "redaxios"
import { useParams, useRouter } from "next/navigation"
import { HandleToastError } from "@/src/components/Toast"

export default function DeleteAdminPage() {
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`/api/admins/` + id).then((res) => {
      setUser(res.data)
    })
  }, [id])

  function goBack() {
    router.push("/dashboard/admins")
  }
  async function deleteAdmin() {
    try {
      const res = await axios.put(`/api/admins/` + id)
      if (res?.status > 400) {
        throw new Error(
          "Une erreur s'est produite lors de la suppression de l'administrateur"
        )
      }
      setAdmins([...admins, res.data])
      setEmailValue("")
      goBack()
    } catch (err) {
      setError(err)
    }
  }

  if (error) {
    return (
      <>
        <HandleToastError />
      </>
    )
  }

  return (
    <div className="flex flex-col justify-center w-full m-auto items-center">
      <h1 className="text-2xl text-blue-800 font-medium">
        Do you want to change role of {user.email}
      </h1>
      <div className="flex items-center mt-4">
        <button className="btn-delete bg-red-500 mr-4" onClick={deleteAdmin}>
          Yes
        </button>
        <button className="btn-delete bg-blue-800" onClick={goBack}>
          No
        </button>
      </div>
    </div>
  )
}
