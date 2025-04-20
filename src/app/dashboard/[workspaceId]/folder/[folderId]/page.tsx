
import { getAllUserVideos, getFolderInfo } from '@/actions/workspace'
import FolderInfo from '@/components/global/folders/folder-info'
import Videos from '@/components/global/videos'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'

type Props = {params: {folderId:string, workspaceId:string}}

export default async function Page(props : Props)  {
  const { folderId, workspaceId } =  props.params;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ['folder-videos'],
    queryFn: () => getAllUserVideos(folderId),
  });

  await query.prefetchQuery({
    queryKey: ['folder-info'],
    queryFn: () => getFolderInfo(folderId),
  });

  await query.prefetchQuery({
    queryKey: ['workspace-videos'],
    queryFn: () => getAllUserVideos(workspaceId)
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <FolderInfo folderId={folderId} />
      <Videos 
        workspaceId={workspaceId} 
        folderId={folderId} 
        videosKey='folder-videos' 
      />
    </HydrationBoundary>
  );
};


