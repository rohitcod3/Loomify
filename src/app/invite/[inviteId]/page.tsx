import { acceptInvite } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'


export default async function page({params}: {params:any}) {
    const {inviteId} = await params as  {
        inviteId: string
    }
    const invite = await acceptInvite(inviteId);
    if(invite.status == 404)return redirect('/auth/sign-in')

    if(invite?.status == 401){
          <div className='h-screen container flex flex-col gap-y-2 justify-center items-center'>
            <h2 className='text-6xl font-bold text-whiet'>Not authorized</h2>
            <p>You are not authorized to accept this invite</p>
          </div>  
    }

    if(invite?.status === 200) return redirect('auth/callback')

  return (
    <div>page</div>
  )
}

