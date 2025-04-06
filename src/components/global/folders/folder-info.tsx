'use client'
import { getFolderInfo } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import React from 'react'
import { FoldersProps } from '.'

type Props = {
    folderId: string
}

const FolderInfo =  ({folderId}: Props) => {
    const {data} = useQueryData(['folder-info'], () => getFolderInfo(folderId))

    const {data: folder} = data as FoldersProps
  return (
    <div className='flex items-center'>
    <h2 className='text-[#BdBdBd] text-2xl'>
        
    </h2>
    </div>
  )
}

export default FolderInfo