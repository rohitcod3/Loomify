import { Button } from '@/components/ui/button'
import { Menu, MountainIcon, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const LandingPageNavBar = (props: Props) => {
  return (
    <div className='flex w-full justify-between items-center'>
    <div className='text-3xl font-semibold flex items-center gap-x-3 '>
        <Menu className='lg:hidden w-8 h-8'/>
        <MountainIcon
        />
        Loomify
    </div>
    <div className='hidden gap-x-10 items-center lg:flex'>
    <Link className='bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80' href='/'>Home</Link>
    <Link href='/'>Pricing</Link>
    <Link href='/'>Contact</Link>
    </div>
    <Link href='/auth/sign-in'><Button>
        <User fill='#000'/>
        Login</Button></Link>
    </div>
  )
}

export default LandingPageNavBar