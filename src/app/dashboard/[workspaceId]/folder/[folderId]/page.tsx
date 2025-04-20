import { getAllUserVideos, getFolderInfo } from '@/actions/workspace'
import FolderInfo from '@/components/global/folders/folder-info'
import Videos from '@/components/global/videos'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {
  params: { folderId: string; workspaceId: string } | Promise<{ folderId: string; workspaceId: string }>
}

export default async function Page({ params }: Props) {
  const { folderId, workspaceId } = await params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['folder-videos'],
    queryFn: () => getAllUserVideos(folderId),
  })

  await queryClient.prefetchQuery({
    queryKey: ['folder-info'],
    queryFn: () => getFolderInfo(folderId),
  })

  await queryClient.prefetchQuery({
    queryKey: ['workspace-videos'],
    queryFn: () => getAllUserVideos(workspaceId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FolderInfo folderId={folderId} />
      <Videos
        workspaceId={workspaceId}
        folderId={folderId}
        videosKey="folder-videos"
      />
    </HydrationBoundary>
  )
}
