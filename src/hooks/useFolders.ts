import { useAppSelector } from "@/redux/store"
import { useEffect, useState } from "react"
import { useMutationData } from "./useMutationData"
import { getWorkspaceFolders, moveVideoLocation } from "@/actions/workspace"
import useZodForm from "./useZodForm"
import { moveVideoSchema } from "@/components/forms/change-video-location/schema"
import { isPagesAPIRouteMatch } from "next/dist/server/route-matches/pages-api-route-match"

export const  useMoveVideos = (videoId: string, currentWorkspace: string)=>{
    const {folders} = useAppSelector((state) => state.FolderReducer)
    const {workspaces} = useAppSelector((state) => state.WorkspaceReducer)

    console.log("Redux workspaces:", workspaces)
    console.log("Redux folders:", folders)
    
    const  [isFetching, setIsFetching] = useState(false);
    const [isFolders, setIsFolders] = useState<
    |({
        _count: {videos:number} 
    }& {id:string,
    name:string, 
    createdAt:Date 
    workSpaceId: string|null
})[] | 
undefined>(undefined)

const {mutate,isPending} = useMutationData(['change-video-location'],
    (data:{folder_id:string, workspace_id:string})=>
        moveVideoLocation(videoId,data.workspace_id, data.folder_id )
    
)
const {errors, onFormSubmit, watch, register} = useZodForm(
moveVideoSchema,
mutate,
{folder_id: null, workspace_id: currentWorkspace}
)

const fetchFolders = async(workspace:string) => {
    setIsFetching(true)
    const folders  = await getWorkspaceFolders(workspace)
    setIsFetching (false)
    console.log("FOLDERS DOT DATA",folders.data)
    setIsFolders(folders.data)
}
useEffect(() => {
    fetchFolders(currentWorkspace)
},[])


useEffect(()=> {
    const workspace = watch(async(value) => {
        if(value.workspace._id) fetchFolders(value.workspace_id)
    })

return () => workspace.unsubscribe();

}, [watch])

return{
    onFormSubmit,
    isPending,
    folders,
    workspaces,
    isFetching,
    isFolders,
    register,
}


}