import CreateFolders from '@/components/global/create-folders'
import CreateWorkspace from '@/components/global/create-workspace'
import Folders from '@/components/global/folders'
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs'
import { TabsTrigger } from '@radix-ui/react-tabs'
import { Video } from 'lucide-react'
import React from 'react'

type Props = {
  params:{workspaceId: string}
}

export default async function Page ({ params }: Props) {
  const awaitedParams = await params;
  const {workspaceId} = awaitedParams;
  return (
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
        <TabsContent value='videos'>
        <div className='flex items-center gap-4'>
          <Video fill='#fff' className='opacity-50'/>
          <p>Videos</p>
        </div>
        </TabsContent>
        </section>        
      </Tabs>
    </div>
  )
}

