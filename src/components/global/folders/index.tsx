'use client'
import { cn } from '@/lib/utils'
import { ArrowRight, Folder } from 'lucide-react'
import React from 'react'
import Folder1 from './folder'
import { useQueryData } from '@/hooks/useQueryData'
import { getWorkspaceFolders } from '@/actions/workspace'
import { useMutationDataState } from '@/hooks/useMutationData'
type Props = {
    workspaceId: string
}

export type FoldersProps = {
    status: number 
    data:({
        _count:{
            videos:number
        }
    } & {
    id: string 
    name: string 
    createdAt: Date 
    workspaceId: string | null
    })[]
}

const Folders = ({workspaceId}: Props) => {
    //getting all the folders
    const {data, isFetched} = useQueryData(["workspace-folders"], () => getWorkspaceFolders(workspaceId))

    const {latestVariables} = useMutationDataState(['create-folder'])

    const {status, data: folders} = data as FoldersProps

    // if(isFetched && folders){
    
    // } 


  return (<div className='flex flex-col gap-4'>
    <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
            <Folder fill='currentColor' className='opacity-50'/>
            <h2 className='text-[#BDBDBD]text-xl'>Folders</h2>
        </div>
        <div className='flex items-center gap-2'>
            <p className='text-[#BDBDBD]'>More</p>
            <ArrowRight color='#707070'/>
        </div>
    </div>
    <section className={cn(status !== 200 &&"justify-center", 'flex items-center gap-4 overflow-x-auto w-full')}>
        {status!== 200 ? (<p className='text-neutral-300'>No folders in workspace</p>) : (
            <>{latestVariables && latestVariables.status==="pending" && (
                <Folder1 
                name={latestVariables.variable.name}
                id={latestVariables.variable.id}
                optimistic
                />
            ) }
            {folders.map((folder) => (
                <Folder1
                name={folder.name}
                count={folder._count.videos}
                id={folder.id}
                key={folder.id}
                />
            ))}
            </>
        )}
    </section>
  </div>)
}

export default Folders