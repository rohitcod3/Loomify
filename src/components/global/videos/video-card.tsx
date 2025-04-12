import React from 'react'
import Loader from '../loader'
import CardMenu from './video-card-menu'
import ChangeVideoLocation from '@/components/forms/change-video-location'
import CopyLink from './copy-link'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Dot, Share2, User } from 'lucide-react'

type Props = {
    User:{
        firstname: string |  null 
        lastname: string | null
        image: string | null
    } | null 
    id: string 
    Folder: {
        id: string 
        name: string
    } | null 
    createdAt: Date 
    title: string | null 
    source: string 
    processing: boolean 
    workspaceId: string
}

function VideoCard( props: Props) {
  const daysAgo = Math.floor(
    (new Date().getTime() - props.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );
  
  return (
    <Loader 
    className='bg-[#171717] flex   justify-center items-center border-[1px] border-[#252525] rounded-xl'
    state={props.processing}> 

    <div className='group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl'>

    <div className='group-hover:flex hidden absolute top-3 right-3 z-50 flex  gap-y-3 gap-2'>
        <CardMenu
        currentFolder={props.Folder?.id}
        currentFolderName={props.Folder?.name}
        videoId={props.id}
        currentWorkspace={props.workspaceId}
        />
        <CopyLink
        variant="ghost"
        className="p-0 h-5 bg-hover:bg-transparent"
        videoId={props.id}
        />
    </div>
        <Link
        className='hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full'
        href={`/preview/${props.id}`}
        >
          <video 
          controls={false}
          preload="metadata"
          className='w-full aspect-video opacity-50 z-20'
          >
           src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STRAM_URL}/${props.source}#t=1`}
          </video>
          <div className=' px-5 py-3 flex flex-col gap-7-2 z-20'>
            <h2 className='text-sm font-semifold text-[#BDBDBD]'>{props.title}
            </h2>
            <div className='flex gap-x-2 items-center mt-4'>
              <Avatar className=''>
                <AvatarImage className='w-10 h-10 rounded-3xl mt-2' src={props.User?.image as string}/>
                <AvatarFallback>
                  <User/>
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='capitalize text-[#] text-sm'>{props.User?.firstname} {props.User?.lastname}
                </p>
                <p className='text-[#707070] text-xs flex items-center'>
                <Dot/>  {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
                </p>
              </div>  
            </div>
            <div className='mt-4'>
              <span className='flex gap-x-1 items-center'>
                <Share2
                fill='#9d9d9d'
                className='text-[#9D9D9D]'
                size={12}
                />
                <p className='text-xs text-[#9D9D9D] capitalize'>
                 {props.User?.firstname}'s Workspace
                </p>
              </span>
            </div>
          </div>
        </Link>
        

    </div>
   
    </Loader>
  )
}

export default VideoCard