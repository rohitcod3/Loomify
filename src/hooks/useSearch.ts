import { useEffect, useState } from "react"
import { useQueryData } from "./useQueryData"
import { searchUsers } from "@/actions/user"
import { getWorkspaceFolders, getWorkspaces } from "@/actions/workspace"

export const useSearch =  (key:string, type:'USERS' | "WORKSPACE" | "FOLDERS") => {
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
    const [workspaceId, setWorkspaceId] = useState("")
    const[results, setResults] = useState<[] | undefined>(undefined)
  


    const onSearchQuery = (e:React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {setDebounce(query)}, 100)
        return () => clearTimeout(delayInputTimeoutId)
    }, [query])

    useEffect(() => {
        if (type !== 'FOLDERS') setWorkspaceId('');
      }, [type]);
      
    const {refetch, isFetching} = useQueryData([key,debounce], async ({queryKey}) => {
        if(type === "USERS"){
            const users =  await searchUsers(queryKey[1] as string)
            if(users.status === 200) setOnUsers(
                users.data)
        }else if(type === "WORKSPACE"){
            const workspaces = await getWorkspaces();
            if(workspaces?.status === 200) setResults(workspaces?.data);
         
        }else if(type === "FOLDERS"){
            let currentWorkspaceId = workspaceId;

            if(!currentWorkspaceId){
                const workspace = await getWorkspaceFolders(currentWorkspaceId);
                currentWorkspaceId = workspace?.data?.WorkSpace?.id || '';
                setWorkspaceId(currentWorkspaceId)
            }

            const folders = await getWorkspaceFolders(currentWorkspaceId);
            if(folders?.status ===  200) setResults(folders?.data)
        }
    },
    false
)



useEffect(() =>{
    if(debounce) refetch()
        if(!debounce) setOnUsers(undefined)
        return () =>{
        debounce}
},[debounce])
return {onSearchQuery, query,isFetching, onUsers, results}
}