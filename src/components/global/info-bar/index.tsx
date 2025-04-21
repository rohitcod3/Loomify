import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearch } from '@/hooks/useSearch'
import { UserButton } from '@clerk/nextjs'
import { Search, UploadIcon, VideoIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const InfoBar = (props: Props) => {
  // If using our refactored hook for workspace search
  const { query, onSearchQuery, results:workspaceResults, isFetching } = useSearch("get-Workspace", "WORKSPACE");
  console.log("workspaceResults in info bar", workspaceResults);

  return (
    <div className='flex flex-col '>
      <header className='pl-20 border-2 md:pl-[265px] fixed p-4 w-full flex items-center justify-between gap-4'>
        <div className='flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg'>
          <Search size={25} className='text-[#707070]' />
          <Input
            className="bg-transparent border-none !placeholder-neutral-500"
            placeholder='Search for people, projects, tags & folders'
            value={query}
            onChange={onSearchQuery}
          />
        </div>
        <div className='flex items-center gap-4'>
          <Button className="bg-[#9d9d9d] flex items-center justify-center gap-2">
            <UploadIcon size={30} />
            <span className='flex items-center'>Upload</span>
          </Button>
          <Button className="bg-[#9d9d9d] flex items-center justify-center gap-2">
            <VideoIcon />
            <span className='flex items-center'>Record</span>
          </Button>
          <UserButton />
        </div>
      </header>

      {/* <div className='absolute  right-10 top-10 text-4xl'>
        {isFetching && <p>Loading...</p>}
        {true ? (
          <div className='flex flex-col a'>
            {[{id:"2", title: "rohit"}, {id:"sixyNine", title:"ko"}].map((workspace, idx) => (
              <div key={workspace.id}>
                <h1>{workspace.title}</h1>
              </div>
            ))}
          </div>
        ) : (
          <p>No workspaces found.</p>
        )}
      </div> */}
    </div>
  );
};

export default InfoBar;
