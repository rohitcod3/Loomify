'use client'
import { getAllUserVideos } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import { VideosProps } from '@/types/index.type'
import { VideoIcon } from 'lucide-react'
import React from 'react'
import VideoCard from './video-card'
import { cn } from '@/lib/utils'

type Props = {
    folderId: string
    videosKey: string
    workspaceId: string
}

const video = {
    User: {
      firstname: "Rohit",
      lastname: "Kumar",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    id: "video_1",
    Folder: {
      id: "folder_1",
      name: "Tutorials",
    },
    createdAt: new Date("2025-04-07T10:00:00Z"),
    title: "Learn Next.js Basics",
    source: "https://example.com/videos/nextjs-basics.mp4",
    processing: false,
    workspaceId: "workspace_1",
  }

function Videos({folderId, videosKey, workspaceId}: Props) {
    const {data: videoData} = useQueryData([videosKey], ()=> getAllUserVideos(folderId))

    const {status: videosStatus, data: videos} = videoData as VideosProps
  return (
    <div className='flex flex-col gap-4 mt-4'>
        <div className='flex items-center gap-4'>
            <VideoIcon/>
            <h2 className='text-[#BdBdBd] text-xl'>Videos

            </h2>
        </div>
        <section className={cn(videosStatus !== 200 ? 'p-5' :'grid grid-cols-1 gap-10 md: grid-cols2 lg:grid-cols-3 xl:grid:cols-4 2xl:grid-cols-5' )}
        >
  
        {/* {videosStatus === 200 ? videos.map((video) => <VideoCard/>) : 
        <p className='text-[#BDBDBD]'>No Videos in workspace</p>
        } */}
        
        <VideoCard {...video}
        />

        </section>
    </div>
  )
}

export default Videos