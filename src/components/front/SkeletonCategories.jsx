"use client"
import { Skeleton } from "@/src/components/ui/skeleton"

export default function SkeletonCategories() {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center py-10">
        <Skeleton className="text-left text-2xl font-bold mb-8" />
        <div className="flex flex-col justify-center items-center">
          <h2 className="font-semibold text-xl">Loading...</h2>
        </div>
      </div>
    </>
  )
}
