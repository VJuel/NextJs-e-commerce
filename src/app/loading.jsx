"use client"
import Spinner from "@/src/components/Spinner"

export default function Loading() {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <Spinner />
      </div>
    </>
  )
}
