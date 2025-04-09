import { useAppSelector } from "@/redux/store"
import { useState } from "react"
import { useMutationData } from "./useMutationData"
import { moveVideoLocation } from "@/actions/workspace"
import useZodForm from "./useZodForm"

export const  useMoveVideos = (videoId: string, currentWorkspace: string)=>{
    const {folders} = useAppSelector((state) => state.FolderReducer)
    const {workspaces} = useAppSelector((state) => state.WorkspaceReducer)


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
    (data:{folder_id:string, workspace_id:string})=>{
        moveVideoLocation(videoId,data.workspace_id, data.folder_id )
    }
)
const {} = useZodForm()
}