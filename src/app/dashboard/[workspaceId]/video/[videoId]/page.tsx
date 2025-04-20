import { getPreviewVideo } from '@/actions/workspace'
import VideoPreview from '@/components/global/videos/preview'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

export type PageParams = Promise<{ videoId: string }>

export default async function Page({ params }: { params: PageParams }) {
  const { videoId } = await params

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
