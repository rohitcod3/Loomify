import {  SignIn } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const SignInPage = (props: Props) => {
  return (
    <>
    {/* <h1 className='text-orange-400'>Test</h1> */}
    <SignIn/>
    </>
  )
}

export default SignInPage