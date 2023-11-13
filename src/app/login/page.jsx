"use client"
import { signIn, useSession } from "next-auth/react"
import { FaGoogle, FaEyeSlash, FaEye } from "react-icons/fa"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import ReactPasswordToggleIcon from "react-password-toggle-icon"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import Link from "next/link"

export default function Login() {
  const [messageError, setMessageError] = useState(null)
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const role = session?.user?.role
  const userClient = session && role === "USER"
  const router = useRouter()
  const [disabled, setDisabled] = useState(true)
  const formRef = useRef(null)
  const [inputValues, setInputValues] = useState({ email: "", password: "" })
  let inputRef = useRef()

  const showIcon = () => <FaEyeSlash aria-hidden="true"></FaEyeSlash>
  const hideIcon = () => <FaEye aria-hidden="true"></FaEye>

  const handleInputChange = (e) => {
    setInputValues({ ...inputValues, [e.target.id]: e.target.value })
  }

  useEffect(() => {
    if (session && role === "ADMIN") {
      router.push("/dashboard")
    }

    if (userClient || role === "") {
      router.push("/homepage")
    }
  }, [session, loading])

  async function handleSubmit(e) {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    if (email === "" || password === "") {
      return setMessageError("Email or password is empty")
    }

    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    })
      .then((res) => {
        if (res?.error === null) {
          res.data
        } else {
          setMessageError(res?.error)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll("input")
      let allFilled = true
      inputs.forEach((input) => {
        if (input.value === "") {
          allFilled = false
        }
      })
      setDisabled(!allFilled)
    }
  }, [handleInputChange])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login with credantials</CardTitle>
          <CardDescription>Enter your email below to login</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {messageError && (
            <p className="text-sm mb-1 text-red-500">{messageError}</p>
          )}
          <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="john@example.com"
                onChange={handleInputChange}
              />
            </div>
            <Label htmlFor="password">Password</Label>
            <div className="grid gap-2 mb-2 relative">
              <Input
                id="password"
                type="password"
                ref={inputRef}
                className="container"
                placeholder="********"
                onChange={handleInputChange}
              />
              <ReactPasswordToggleIcon
                inputRef={inputRef}
                showIcon={showIcon}
                hideIcon={hideIcon}
              />
            </div>
            <Button className="w-full" type="submit" disabled={disabled}>
              Login
            </Button>
            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => signIn("google")}
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <p className="mt-4 flex justify-center items-center">
              You don't have an account?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
              <Link
                href="/signin"
                className="flex justify-baseline items-center bg-background px-1 text-center text-muted-foreground text-sm"
              >
                <span className="text-blue-800 m-0 p-0 text-[16px]">
                  Create account
                </span>
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
