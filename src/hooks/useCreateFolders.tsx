import { createFolder } from "@/actions/workspace"
import { useMutationData } from "./useMutationData"

export const useCreateFolders = (workspaceId: string) => {
  const { mutate } = useMutationData(
    ['create-folder'],
    (variables: { name: string; id: string }) => createFolder(workspaceId, variables),
    "workspace-folders"
  )

  const onCreateNewFolder = () => {
    mutate({ name: 'Untitled', id: 'optimistic-id' }) 
  }

  return { onCreateNewFolder }
}
