"use client"
import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import Loader from '../loader'
import { Folder } from 'lucide-react'
import { useMutationData, useMutationDataState } from '@/hooks/useMutationData'
import { renameFolders } from '@/actions/workspace'
import { Input } from '@/components/ui/input'
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

    const Rename = () => setOnRename(true);
    const Renamed = () => setOnRename(false)

    const {mutate, isPending} = useMutationData(["rename-folders"], 
      (data:{name:string}) => renameFolders(id,data.name), 
    'workspace-folders',
     Renamed
)

const {latestVariables} = useMutationDataState(['rename-folders'])

    const handleFolderClick = () => {
      if(onRename) return
      router.push(`${pathName}/folder/${id}`)
    }

    const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    //rename
    Rename();
    }

    const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
      const newName = inputRef.current?.value;
      // For example, assume you have the original name in a state variable 'name'
      if (newName && newName !== name) {
        mutate({ name: newName, id });
      } else {
        Renamed();
      }
    };
    
  return (
    <div 
    onClick={handleFolderClick}
    ref={folderCardRef}
    className={cn(optimistic && "opacity-60",'flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-6 px-4 rounded-lg border-[1px] ')}>
        <Loader
        state={false}
        > 
        <div className='flex flex-col gap-[1px]'>
          {onRename ? (
          <Input 
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {updateFolderName(e)}}
          placeholder={name} 
          autoFocus 
          className='border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0' 
          ref={inputRef}
          />
          ) : (
            <p 
            onClick={(e) => e.stopPropagation()}
            className='text-neutral-300'
            onDoubleClick={handleNameDoubleClick}
            >
              {latestVariables && latestVariables.status === 'pending' &&
              latestVariables.variable.id === id ? latestVariables.variable.name : name
              }
              </p>
          )}
         <span className='text-sm text-neutral-500 '>{count || 0 } videos</span>
        </div>
        </Loader>
        <Folder fill='currentColor' className='opacity-50'/>
    </div>
  )
}

export default Folder1