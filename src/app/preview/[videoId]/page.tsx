import { getPreviewVideo } from '@/actions/workspace'
import VideoPreview from '@/components/global/videos/preview'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

const VideoPage = async (props: {
  params: Promise<{ videoId: string }>
}) => {
  const { videoId } = await props.params

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['preview-video'],
    queryFn: () => getPreviewVideo(videoId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VideoPreview videoId={videoId} />
    </HydrationBoundary>
  )
}

export default VideoPage
