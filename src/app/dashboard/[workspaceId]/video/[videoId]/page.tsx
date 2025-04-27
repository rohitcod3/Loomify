import { getUserProfile, getVideoComments } from '@/actions/user'
import { getPreviewVideo } from '@/actions/workspace'
import VideoPreview from '@/components/global/videos/preview'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

export default async function Page(props: {
  params: Promise<{ videoId: string }>
}) {
  const { videoId } = await props.params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['preview-video'],
    queryFn: () => getPreviewVideo(videoId),
  })

  await queryClient.prefetchQuery({
    queryKey:['user-profile'],
    queryFn: getUserProfile,
  })
  
  await queryClient.prefetchQuery({
    queryKey:['video-comments'],
    queryFn: () => getVideoComments(videoId),
  })



  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VideoPreview videoId={videoId} />
    </HydrationBoundary>
  )
}
