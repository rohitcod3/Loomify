import CreateFolders from '@/components/global/create-folders'
import CreateWorkspace from '@/components/global/create-workspace'
import Folders from '@/components/global/folders'
import Videos from '@/components/global/videos'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { TabsTrigger } from '@radix-ui/react-tabs'
import { Video } from 'lucide-react'
import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getAllUserVideos } from '@/actions/workspace'
import Link from 'next/link'

type Props = {
  params: { workspaceId: string }
}

export default async function Page({ params }: Props) {
  const { workspaceId } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['workspace-videos'],
    queryFn: () => getAllUserVideos(workspaceId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <Tabs defaultValue="videos" className="mt-6">
          <div className="flex w-full justify-between items-center">
            <TabsList className="bg-transparent gap-2 pl-0">
              <TabsTrigger
                className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
                value="videos"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
                value="archive"
              >
                Archive
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-x-3">
              <CreateWorkspace />
              <CreateFolders workspaceId={workspaceId} />
            </div>
          </div>

          <section className="py-9">
            <TabsContent value="videos">
              <Folders workspaceId={workspaceId} />
            </TabsContent>
          </section>

          <section>
            <TabsContent value="videos">
              <div className="flex items-center gap-4">
                <Link href={`/dashboard/video/${workspaceId}`}>
                  <Videos
                    workspaceId={workspaceId}
                    videosKey="workspace-videos"
                  />
                </Link>
              </div>
            </TabsContent>
          </section>
        </Tabs>
      </div>
    </HydrationBoundary>
  )
}
