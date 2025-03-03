import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutationData } from '@/hooks/useMutationData'
import { useSearch } from '@/hooks/useSearch'
import React from 'react'

type Props = {
    workspaceId:string
}

function Search({workspaceId}: Props) {
    const {query, onSearchQuery, isFetching, onUsers} = useSearch('get-USERS',
      'USERS'
    )

    // const {mutate,isPending} = useMutationData(["invite-member"], (data: {recieverId:string; email:string}) => {

    // })
  return (
    <div className='flex flex-col gap-y-5'> 
    <Input onChange={onSearchQuery} 
    value={query}
    className='bg-transparent border-2 outline-none'
    placeholder="Search for your user..."
    type="text"
    />
    {isFetching? (<div className='flex flex-col gap-y-2'>
      <Skeleton className='w-full h-8 rounded-xl'/>
    </div>) : !onUsers? (
      <p className='text-center text-sm text-[#a4a4a4]'>No Users Found</p>
    ) : (
      <div>{onUsers.map((user) => (
        <div key={user.id}
        className='flex gap-x-3 items-center border-2 w-full p-3 rounded-xl'
        > </div>
      ))}</div>
    )}
    </div>
  )
}

export default Search