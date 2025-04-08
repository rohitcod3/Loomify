import { Label } from '@/components/ui/label'
import { Separator } from '@radix-ui/react-select'
import React from 'react'

type Props = {
    videoId: string
    currentFolder?: string
    currentWorkSpace?:string
    currentFolderName?: string
}

function ChangeVideoLocation ({
videoId,
currentFolder,
currentFolderName,
currentWorkSpace
}: Props) {

const {} = useMoveVideos();
  return (
   <form className='flex flex-col gap-y-5'>
    <div className='border-[1px] rounded-xl p-5'>
        <h2 className='text-xs mb-5'>Current</h2>
     <p className='text-[#a4a4a4]'>Workspace</p>
     <p className='text-[#a4a4a4]'>This video has no folder</p>
    </div>
    <Separator></Separator>
    <div className='flex flex-col gap-y-5 p-5 border-[1px] rounded-xk'>
        <h2 className='text-xs text=[#a4a4a4]'>To</h2>
        <Label className='flex-col gap-y-2'>
            <p className='text-xs'>Workspace</p>
            <select className='rounded-xl text-base bg-transparent'>
            <option
            className='text-[#a4a4a4]'
            
            value={"something"}
            >
                workspace
            </option>
            </select>
        </Label>
    </div>
   </form>
  )
}

export default ChangeVideoLocation