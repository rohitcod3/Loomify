import { useEffect, useState } from "react"
import { useUserQueryData } from "./userQueryData"

export const useSearch = (key:string, type:'WORKSPACE') => {
    const [query, setQuery] = useState('')
    const[debounce,setDebounce] = useState("")
    const [onUsers, setOnUsers] = useState<{id: string 
        subscription: {
            plan: 'PRO' | 'FREE'
        } | null
        firstname: string | null
        lastname: string | null
        image: string | null
        email: string | null
    }[]
    | undefined
    >(undefined)

    const onSearchQuery = (e:React.ChangeEvent<HTMLInputElement>){
        setQuery(e.target.value)
    }

    useEffect(() => {
        const deplayInputTimeoutId = setTimeout(() => {setDebounce(query)}, 100)
        return () => clearTimeout(deplayInputTimeoutId)
    }, [query])

    const {refetch, isFetching} = useUserQueryData([key,debounce], async ({queryKey}) => {
        if(type === "WORKSPACE"){
            const workspace =  await searchWorkspace()
        }
    })
}