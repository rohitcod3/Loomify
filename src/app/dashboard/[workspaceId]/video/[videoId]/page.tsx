import { getPreviewVideo } from '@/actions/workspace'
import VideoPreview from '@/components/global/videos/preview'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

export default async function Page(props: any) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['preview-video'],
    queryFn: () => getPreviewVideo(props.params.videoId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VideoPreview videoId={props.params.videoId} />
    </HydrationBoundary>
  )
}
