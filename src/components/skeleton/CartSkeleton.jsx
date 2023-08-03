'use client'
import { Skeleton } from "@/src/components/ui/skeleton"

export default function CartSkeleton() {
    return (
        <table className="w-full">
            <tbody className="w-full">
                <tr className="flex justify-between items-center w-full mb-4">
                    <td className="w-full">
                        <Skeleton className="w-full h-[20px]"/>
                    </td>
                </tr>
                <tr>
                    <td className='w-1/3'>
                        <Skeleton className="w-full h-[100px]"/>
                    </td>
                    <td className='w-1/3'>
                        <Skeleton className="w-full h-[30px]"/>
                    </td>
                    <td className='w-1/3'>
                        <Skeleton className="w-full h-[40px]"/>
                    </td>
                </tr>
            </tbody>
         </table>
    )
}