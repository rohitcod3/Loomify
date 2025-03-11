'use client'
import { getWorkspaces } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import React from 'react'
import Modal from '../modal'
import { Button } from '@/components/ui/button'
import { Folder, FolderCheckIcon, FolderCodeIcon, FolderEdit } from 'lucide-react'
import WorkspaceForm from '@/components/forms/workspace-form'

type Props = {}

const CreateWorkspace = (props: Props) => {
    const {data} = useQueryData(["user-workspaces"], getWorkspaces);

    const  {data: plan} = data as {
        status: number
        data: {
            subscription:{
                plan: 'PRO' | 'FREE'
            } | null
        }
    }
    if(plan.subscription?.plan ===  "FREE"){
        return <></>
    }
    if(plan.subscription?.plan === 'PRO')
  return (
    <Modal
    title="Create a Workspace"
    description='Workspaces helps you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with yourself.'
    trigger={
    <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl">
    <Folder/>
    Create a workspace
    </Button>}
    >
        <WorkspaceForm/>
    </Modal>
  )
}

export default CreateWorkspace