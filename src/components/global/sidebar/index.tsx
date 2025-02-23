import { MountainIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {}

const Sidebar = ({actionWorkspaceId}: Props) => {
  return (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250] flex flex-col gap-4 items-center overflow-hidden'>
        <div className='bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0'>
        <MountainIcon/>
        </div>
        <p className='text-2xl'>Loomify</p>
    </div>
  )
}

export default Sidebar