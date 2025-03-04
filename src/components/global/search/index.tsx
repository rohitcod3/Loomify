import { AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutationData } from '@/hooks/useMutationData'
import { useSearch } from '@/hooks/useSearch'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { User } from 'lucide-react'
import React from 'react'
import Loader from '../loader'

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
     {/* {[
      {
        id:'rohit', 
        image:"asdasdasd", 
        firstname:"rohit", 
        lastname:"code",
        subscription:{
          plan:"FREE",
        },
      },
    ].map((user) => (
        <div 
        key={user.id}
        className='flex  gap-x-3 items-center border-2 w-full p-3 rounded-xl '
        > 
        <Avatar >
          <AvatarImage className="p-2"src={user.image as string}/>
          <AvatarFallback>
            <User size={30} className="p-1"/>
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col  items-start '>
          <h3 className='text-bold text-lg capitalize' 
          >{user.firstname} {user.lastname}</h3>
          <p className='lowercase text-xs bg-white px-2 rounded-lg text-[#1e1e1e]'>{user.subscription.plan}</p>
        </div>
        <div className=' flex-1 justify-end flex items-center'>
          <Button onClick={() => {}} variant={"default"}
           className="w-5/12 font-bold"
           >
            <Loader state={false} color='#000'>
              Invite
            </Loader>
            </Button>
        </div>
        </div>
      ))} */}
    {isFetching? (<div className='flex flex-col gap-y-2'>
      <Skeleton className='w-full h-8 rounded-xl'/>
    </div>) : !onUsers? (
      <p className='text-center text-sm text-[#a4a4a4]'>No Users Found</p>
    ) : (
      <div>{onUsers.map((user) => (
        <div 
        key={user.id}
        className='flex  gap-x-3 items-center border-2 w-full p-3 rounded-xl '
        > 
        <Avatar >
          <AvatarImage className="p-2"src={user.image as string}/>
          <AvatarFallback>
            <User size={30} className="p-1"/>
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col  items-start '>
          <h3 className='text-bold text-lg capitalize' 
          >{user.firstname} {user.lastname}</h3>
          <p className='lowercase text-xs bg-white px-2 rounded-lg text-[#1e1e1e]'>{user.subscription?.plan}</p>
        </div>
        <div className=' flex-1 justify-end flex items-center'>
          <Button onClick={() => {}} variant={"default"}
           className="w-5/12 font-bold"
           >
            <Loader state={false} color='#000'>
              Invite
            </Loader>
            </Button>
        </div>
        </div>
      ))}</div>
    )}
    </div>
  )
}

export default Search