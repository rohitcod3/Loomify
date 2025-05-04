import { acceptInvite } from '@/actions/user';
import React from 'react'


export default async function page({params}: {params:any}) {
    const {inviteId} = await params as  {
        inviteId: string
    }
    const invite = await acceptInvite(inviteId);
  return (
    <div>page</div>
  )
}

