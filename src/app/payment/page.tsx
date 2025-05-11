import { completeSubscription } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

// type Props = {
//     searchParams:{session_id?:string;cancel?:boolean}
// }

export default async function page({params}: {params:any}) {

    const {session_id, cancel} = await params as {session_id:string, cancel:string}

    const customer = await completeSubscription(session_id)
    if(customer.status === 200){
        return redirect('/auth/callback')
    }
 if(cancel){
    return(
        <div className='flex flex-col justify-center items-center h-screen w-full'>
            <h4 className='text-5xl font-bold'>404</h4>
            <p className='text-xl text-center'>Opps! Something went wrong</p>
        </div>
    )
 }
}

