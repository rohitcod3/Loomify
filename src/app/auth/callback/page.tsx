import { onAuthenticatedUser } from '@/actions/user'
import { redirect } from 'next/navigation';
import React from 'react'



const DashboardPage = async (props: Props) => {
  //authentication
  const auth = await onAuthenticatedUser();

  if(auth.status === 200 || auth.status === 201){
    return redirect(`/dashboard/${auth.user?.firstname}${auth.user?.lastname}`)
  }

  if(auth.status === 400 || auth.status === 500 || auth.status === 404){
    return redirect('/auth/sign-in')
  }

}

export default DashboardPage