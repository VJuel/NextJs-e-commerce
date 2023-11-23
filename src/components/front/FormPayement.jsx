"use client"
import { useState, useContext } from "react"
import { PayementSchema } from "@/src/lib/schema"
import { BtnPayement } from "@/src/components/front/button/BtnPayement"
import { CartContext } from "@/src/components/CartContext"
import { useToast } from "@/src/components/ui/use-toast"
import axios from "redaxios"
import FormPayementSkeleton from "@/src/components/skeleton/FormPayementSkeleton"

export default function FormPayement({ loading }) {
  const [validationError, setValidationError] = useState([])
  const errorForm = "text-sm px-2 mb-1 text-red-500"
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [city, setCity] = useState("")
  const [codePostal, setCodePostal] = useState("")
  const [streetAdress, setStreetAdress] = useState("")
  const [country, setCountry] = useState("")
  const [order, setOrder] = useState([])
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext)

  function checkForm(data) {
    const { name, email, city, codePostal, streetAdress, country } = data
    const { success, error: zodError } = PayementSchema.safeParse({
      name,
      email,
      city,
      codePostal,
      streetAdress,
      country,
    })
    if (!success) {
      return zodError.format()
    }
  }

  async function goToPayment() {
    const data = {
      name,
      email,
      city,
      codePostal,
      streetAdress,
      country,
      cartProducts,
    }
    const zodCheck = await checkForm(data)

    if (zodCheck) {
      setValidationError(zodCheck)
      return
    }

    data.cartProducts = cartProducts

    try {
      const response = await axios
        .post(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/checkout`, data)
        .then((res) => {
          return res.data
        })
      if (response?.data) {
        window.location = response.data
      }
    } catch (err) {
      throw new Error(err)
    } finally {
      setName("")
      setEmail("")
      setCity("")
      setCodePostal("")
      setStreetAdress("")
      setCountry("")
      clearCart()
    }
  }

  if (loading) {
    return (
      <>
        <FormPayementSkeleton />
      </>
    )
  }

  return (
    <form method="post" className="formPayement" onSubmit={() => goToPayment()}>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />

      {validationError?.name && (
        <p className={errorForm}>{validationError.name._errors.join(", ")}</p>
      )}

      <input
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      {validationError?.email && (
        <p className={errorForm}>{validationError.email._errors.join(", ")}</p>
      )}

      <input
        className="!w-1/2 pl-2"
        type="text"
        name="city"
        placeholder="City"
        value={city}
        onChange={(ev) => setCity(ev.target.value)}
      />

      <input
        className="!w-1/2"
        type="text"
        placeholder="Code postal"
        name="code postal"
        value={codePostal}
        onChange={(ev) => setCodePostal(ev.target.value)}
      />
      {validationError?.city && (
        <p className={errorForm}>{validationError.city._errors.join(", ")}</p>
      )}
      {validationError?.codePostal && (
        <p className={errorForm}>
          {validationError.codePostal._errors.join(", ")}
        </p>
      )}

      <input
        type="text"
        placeholder="Street adress"
        name="street adress"
        value={streetAdress}
        onChange={(ev) => setStreetAdress(ev.target.value)}
      />
      {validationError?.streetAdress && (
        <p className={errorForm}>
          {validationError.streetAdress._errors.join(", ")}
        </p>
      )}

      <input
        type="text"
        placeholder="country"
        name="country"
        value={country}
        onChange={(ev) => setCountry(ev.target.value)}
      />
      {validationError?.country && (
        <p className={errorForm}>
          {validationError.country._errors.join(", ")}
        </p>
      )}

      <input type="hidden" name="products" value={cartProducts.join(",")} />
      {validationError?.cartProducts && (
        <p className={errorForm}>Error avec le panier</p>
      )}
      <BtnPayement className="!mt-10" type="submit" />
    </form>
  )
}
