"use client"
import { useToast } from "@/src/components/ui/use-toast"

export const HandleToastError = () => {
  const { toast } = useToast()
  return toast({
    title: "You dont have access",
    description: `You can't change data`,
  })
}
