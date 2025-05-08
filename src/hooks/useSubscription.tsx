import { useState } from "react"

export const useSubscription = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const onSubscribe =  async () => {
        setIsProcessing(true)
        const response  = await
    }
}