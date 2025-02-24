'use client'
import { getWorkspaces } from '@/actions/workspace'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useUserQueryData } from '@/hooks/userQueryData'
import { WorkspaceProps } from '@/types/index.type'
import { MountainIcon, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import Modal from '../modal'

type Props = {
    activeWorkspaceId: string
}

const Sidebar = ({activeWorkspaceId}: Props) => {
    const router = useRouter()
    
    const {data,isFetched} = useUserQueryData(["user-workspaces"], getWorkspaces)
    const {data:workspace} = data as WorkspaceProps
    console.log(workspace)
    const onChangeActiveWorkspace = (value : string) => {
        router.push(`/dashboard/${value}`)
    }
    console.log(activeWorkspaceId)
  return (
    <div className='bg-[#111111] flex-none gap-4 relative p-4 h-full w-[250] flex flex-col items-center overflow-hidden'>
        <div className='bg-[#111111] p-4 flex gap-2 justify-center items-center mb-1 top-0 left-0 right-0'>
        <MountainIcon
        height={60}
        />
        <p className='text-2xl text-white'>Loomify</p>
        </div>
        <Select  
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace} >
            <SelectTrigger className='mt-4 text-neutral-400 bg-transparent'>
                <SelectValue placeholder="Select a workspace"></SelectValue>
            </SelectTrigger>
            <SelectContent className='bg-[#111111] backdrop-blur-xl'>
            
            <SelectGroup>
                <SelectLabel>Workspaces</SelectLabel>
                <Separator/>
            {workspace?.WorkSpace?.map((workspace:any) => (<SelectItem key={workspace.id} value={workspace.id}>{workspace.name}</SelectItem>))}
            {workspace.members.length > 0 && workspace.members.map((workspace) => 
                workspace.Workspace && <SelectItem value={workspace.Workspace.id}
                key={workspace.Workspace.id}
                >{workspace.Workspace.name}</SelectItem>
            )}
            </SelectGroup>

            </SelectContent>
        </Select>
    <Modal 
    title="Invite to Workspace" 
    trigger={<span className='text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px]' >
    <PlusCircle size={15} className='text-neutral-800/90 fill-neutral-500'/>
    <span className='text-neutral-400 font-semibold text-xs'>
        Invite To Workspace
    </span>
    </span>}
    description="Invite other users to your workspace"
    >
        WorkspaceSearch
    </Modal>
    </div>
  )
}

export default Sidebar