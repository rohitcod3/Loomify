import React from 'react'
import { getAllUserVideos, getFolderInfo } from '@/actions/workspace'
import FolderInfo from '@/components/global/folders/folder-info'
import Videos from '@/components/global/videos'
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'

export default async function Page({
  params,
}: {
  params: { folderId: string; workspaceId: string }
}) {
  const { folderId, workspaceId } = params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['folder-videos', folderId],
    queryFn: () => getAllUserVideos(folderId),
  })

  await queryClient.prefetchQuery({
    queryKey: ['folder-info', folderId],
    queryFn: () => getFolderInfo(folderId),
  })

  await queryClient.prefetchQuery({
    queryKey: ['workspace-videos', workspaceId],
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
