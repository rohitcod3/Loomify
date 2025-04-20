
import React from 'react'
import { getAllUserVideos, getFolderInfo } from '@/actions/workspace'
import FolderInfo from '@/components/global/folders/folder-info'
import Videos from '@/components/global/videos'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'


type Props = {
  params: {
    folderId: string
    workspaceId: string
  }
}

async function prefetchQueries(folderId: string, workspaceId: string) {
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

  return dehydrate(queryClient)
}

export default async function Page({ params }: Props) {
  const { folderId, workspaceId } = params

  const dehydratedState = await prefetchQueries(folderId, workspaceId)

  return (
    <HydrationBoundary state={dehydratedState}>
      <FolderInfo folderId={folderId} />
      <Videos
        workspaceId={workspaceId}
        folderId={folderId}
        videosKey="folder-videos"
      />
    </HydrationBoundary>
  )
}
