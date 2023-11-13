"use client"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { FaGoogle, FaUserAlt } from "react-icons/fa"
import { Button } from "@/src/components/ui/button"
import { z } from "zod"
import axios from "redaxios"
import { useToast } from "@/src/components/ui/use-toast"

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
import Spinner from "@/src/components/Spinner"
import Link from "next/link"

export default function Signin() {
  const { toast } = useToast()
  const [validationError, setValidationError] = useState([])
  const router = useRouter()
  const { data: session, status } = useSession()
  const errorForm = "text-sm px-2 mb-1 text-red-500"
  const role = session?.user?.role
  const loading = status === "loading"
  const userClient = session && role === "USER"
  const [isExistingUser, setIsExistingUser] = useState(false)

  const handleToast = useCallback(() => {
    return toast({
      title: "User already exists",
      description: `Please login with your credentials`,
    })
  }, [isExistingUser])

  useEffect(() => {
    console.log(session)
    if (session && role === "ADMIN") {
      router.push("/dashboard")
    }

    if (userClient || role === "") {
      router.push("/homepage")
    }
  }, [session, loading])

  if (loading) {
    return <Spinner />
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    const registerUserSchema = z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(5, "Password should be minimum 5 characters"),
    })

    const { success, error: zodError } = registerUserSchema.safeParse({
      email,
      password,
    })

    if (!success) {
      setValidationError(zodError.format())
      return
    }

    const formData = new FormData()

    formData.append("email", email)
    formData.append("password", password)

    const user = await axios.post("/api/register", formData).then((res) => {
      return res.data
    })

    if (user?.isExistingUser) {
      setIsExistingUser(!isExistingUser)
      handleToast()
      return
    }

    const loginData = {
      email: user?.email,
      password: formData.get("password"),
      redirect: false,
    }

    const login = await signIn("credentials", loginData)

    if (login?.error !== null) {
      if (user?.role === "ADMIN") {
        router.push("/dashboard")
      }
      router.push("/homepage")
    } else {
      router.push("/signin")
    }
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Card className="max-w-2xl px-6">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" onClick={() => signIn("google")}>
              <FaGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="text" placeholder="john@example.com" />

                {validationError?.email && (
                  <p className={errorForm}>
                    {validationError.email._errors.join(", ")}
                  </p>
                )}
              </div>
              <div className="grid gap-2 mb-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />

                {validationError?.password && (
                  <p className={errorForm}>
                    {validationError.password._errors.join(", ")}
                  </p>
                )}
              </div>
              <Button className="w-full" type="submit">
                Create account
              </Button>
              <Link
                href="/login"
                className="flex justify-baseline mt-4 items-center bg-background px-1 text-center text-muted-foreground"
              >
                Or go
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
                <span className="text-blue-800 m-0 p-0 text-[16px]">
                  Login page
                </span>
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }
}
