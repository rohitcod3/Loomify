'use client'
import {  SignIn } from '@clerk/nextjs'
import React from 'react'
import { useUser } from '@clerk/nextjs'
type Props = {}

const SignInPage = (props: Props) => {
  const {isSignedIn} = useUser();
  // if(isSignedIn){
  //   return <p>You are already signed in</p> 
  //       }
  return (
    <>
    {/* <h1 className='text-orange-400'>Test</h1> */}
    
    <SignIn/>
    </>
  )
}

export default SignInPage