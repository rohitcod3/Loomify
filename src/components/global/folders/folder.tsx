"use client"
import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import Loader from '../loader'
import { Folder } from 'lucide-react'
type Props = {
    name: string
    id:string
    optimistic?:boolean
    count?:number
}

const Folder1 = ({id, name,optimistic,count}: Props) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const folderCardRef = useRef<HTMLDivElement | null>(null)
    const pathName = usePathname()
    const router = useRouter();
    const [onRename, setOnRename] = useState(false);
    const handleFolderClick = () => {
      router.push(`${pathName}/folder/${id}`)
    }

    const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    //rename

    }
  return (
    <div 
    onClick={handleFolderClick}
    className={cn('flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-6 px-4 rounded-lg border-[1px] ')}>
        <Loader
        state={false}
        > 
        <div className='flex flex-col gap-[1px]'>
         <p
         onDoubleClick={(e) => {
          e.stopPropagation();
          console.log("double click")}}
         
         className='text-neutral-300'>
          {name}
         </p>
         <span className='text-sm text-neutral-500 '>{count || 0 } videos</span>
        </div>
        </Loader>
        <Folder fill='currentColor' className='opacity-50'/>
    </div>
  )
}

export default Folder1