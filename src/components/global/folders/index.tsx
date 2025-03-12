'use client'
import { cn } from '@/lib/utils'
import { ArrowRight, Folder } from 'lucide-react'
import React from 'react'
import Folder1 from './folder'
import { useQueryData } from '@/hooks/useQueryData'
import { getWorkspaceFolders } from '@/actions/workspace'
type Props = {
    workspaceId: string
}

const Folders = ({workspaceId}: Props) => {
    //getting all the folders
    const {} = useQueryData(["workspace-folders"], () => getWorkspaceFolders(workspaceId))

    const {} = useMutationDataState()


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
    <section className={cn('flex items-center gap-4 overflow-x-auto w-full')}>
        <Folder1 name="folder title"/>
    </section>
  </div>)
}

export default Folders