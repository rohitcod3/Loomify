import React from 'react'
import { getAllUserVideos, getFolderInfo } from '@/actions/workspace'
import FolderInfo from '@/components/global/folders/folder-info'
import Videos from '@/components/global/videos'
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'

interface PageProps {
  dehydratedState: any;
  folderId: string;
  workspaceId: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { folderId, workspaceId } = context.params as { folderId: string; workspaceId: string };
  
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ['folder-videos', folderId],
    queryFn: () => getAllUserVideos(folderId),
  });
  
  await queryClient.prefetchQuery({
    queryKey: ['folder-info', folderId],
    queryFn: () => getFolderInfo(folderId),
  });
  
  await queryClient.prefetchQuery({
    queryKey: ['workspace-videos', workspaceId],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      folderId,
      workspaceId,
    },
  };
};

export default function Page({ dehydratedState, folderId, workspaceId }: PageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <FolderInfo folderId={folderId} />
      <Videos
        workspaceId={workspaceId}
        folderId={folderId}
        videosKey="folder-videos"
      />
    </HydrationBoundary>
  );
}