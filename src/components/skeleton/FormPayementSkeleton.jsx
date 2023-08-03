'use client'
import { Skeleton } from "@/src/components/ui/skeleton"

export default function FormPayementSkeleton() {
    return (
        <div className="w-full p-4 flex-col">
            <Skeleton className="w-full h-[30px]"/>
            <Skeleton className="w-full h-[20px]"/>
            <div className="flex">
                <Skeleton className="w-full h-[20px]"/>
                <Skeleton className="w-full h-[20px]"/>
            </div>
            <Skeleton className="w-full h-[20px]"/>
         </div>
    )
}