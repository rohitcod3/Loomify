import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useMoveVideos } from '@/hooks/useFolders'
import { Separator } from '@radix-ui/react-select'
import { current } from '@reduxjs/toolkit'
import React from 'react'

type Props = {
    videoId: string
    currentFolder?: string
    currentWorkSpace?:string
    currentFolderName?: string
}

function ChangeVideoLocation({
  videoId,
  currentFolder,
  currentFolderName,
  currentWorkSpace
}: Props) {
  const {
    register,
    isPending,
    onFormSubmit,
    folders,
    workspaces,
    isFetching,
    isFolders,
  } = useMoveVideos(videoId, currentWorkSpace!);

  const folder = folders?.find((f) => f.id == currentFolder);
  const workspace = workspaces?.find((f) => f.id === currentWorkSpace);
console.log("\x1b[36m%s\x1b[0m",workspaces,"IN THE CHANGE VIDEO LOCATION")
  return (
    <form className='flex flex-col gap-y-5' onSubmit={onFormSubmit}>
      <div className='border-[1px] rounded-xl p-5'>
        <h2 className='text-xs  text-[#a4a4a4]'>Current</h2>
        {workspace && <p>{workspace.name}</p>}
        <h2 className='text-xs text-[#a4a4a4] mt-4'>Current Folder</h2>
        {folder ? <p>{folder.name}</p> : 'This video has no folder'}
      </div>

      <Separator />

      <div className='flex flex-col gap-y-5 p-5 border-[1px] rounded-xl'>
        <h2 className='text-xs text-[#a4a4a4]'>To</h2>

        <Label className='flex-col gap-y-2'>
          <p className='text-xs'>Workspace</p>
          <select className='rounded-xl mt-1 text-base bg-transparent w-full' {...register('workspace_id')}>
          {workspaces?.map((space) => (
            <option
            key={space.id}
            className='text-[#a4a4a4]'
            value={space.id}
            >
                {space.name}
            </option>
          ))}
          </select>
        </Label>
        {isFetching ? <Skeleton className='w-full h-[40px] rounded-xl'/> : (
            <Label className='flex justify-between  flex-col gap-y-2'>
                <p className='text-xs'>Folders in workspace</p>
                    {isFolders && isFolders.length > 0 ? <select {...register("folder_id")} className='rounded-xl bg-transparent flex-1 text-base'>
                        {isFolders.map((folder,key) => key === 0 ? (
                            <option
                            className='text-[#a4a4a4]'
                            key={folder.id}
                            value={folder.id}
                            >
                                {folder.name}
                            </option>
                        ) : (
                            <option
                            className='text-[#a4a4a4]'
                            key={folder.id}
                            value={folder.id}
                            >
                                {folder.name}
                            </option>
                        )
                    )}
                    </select> : (
                        <p
                        className='text-[#a4a4a4] text-sm'
                        >This workspace has no folders</p>
                    )}
                
            </Label>
        )}
      </div>
      <Button>
        <Loader state={isPending} color='#000'> Transfer</Loader>
      </Button>
    </form>
  );
}


export default ChangeVideoLocation