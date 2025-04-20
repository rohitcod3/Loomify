'use client'
import { getAllUserVideos } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import { VideosProps } from '@/types/index.type'
import { Video, VideoIcon } from 'lucide-react'
import React from 'react'
import VideoCard from './video-card'
import { cn } from '@/lib/utils'

type Props = {
    folderId?: string
    videosKey: string
    workspaceId: string
}



function Videos({folderId, videosKey, workspaceId}: Props) {
    const {data: videoData} = useQueryData([videosKey], ()=> getAllUserVideos(folderId ?? workspaceId))


if (!videoData) return <p className='text-red-500'>Loading</p>;

    const {status: videosStatus, data: videos} = videoData as VideosProps
  return (
    <div className='flex flex-col gap-4 mt-4'>
        <div className='flex items-center gap-4'>
          {folderId ?  <VideoIcon/> : <Video fill='#fff' className='opacity-50'/>}
            
            <h2 className='text-[#BdBdBd] text-xl'>Videos

            </h2>
        </div>
        <section className={cn(
          videosStatus !== 200 ? 
          'p-5' 
           : 'grid grid-cols-1 gap-10 md: grid-cols2 lg:grid-cols-3 xl:grid:cols-4 2xl:grid-cols-5' )}
        >
  
        {videosStatus === 200 ? (
        videos.map((video) => (
        <VideoCard 
        key={video.id}
        workspaceId={workspaceId}
        {...video}
        />
      ))
   ) : 
       ( 
       <p className='text-[#BDBDBD]'>No Videos in workspace</p>
        )}
        
        

        </section>
    </div>
  )
}

export default Videos