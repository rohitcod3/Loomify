'use client'
import { Button } from '@/components/ui/button'
import { Menu, MountainIcon, User } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import {  X } from 'lucide-react'

type Props = {}

const LandingPageNavBar = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div className='flex flex-col py-2 px-2'>
    {/* <div className='text-3xl font-semibold flex items-center gap-x-3 '>
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
        Login</Button></Link> */}

<header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">Loomify</span>
        </Link>
        <div className="flex items-center">
          <nav className="hidden md:flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
              Features
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
              How It Works
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
              Pricing
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
          <Link className="ml-2" href='/auth/sign-in'><Button>
        <User fill='#000'/>
        Login</Button></Link>
          
        <Link className="ml-2" href='/auth/sign-up'>
        <Button className="p-4">Sign Up</Button></Link>
            
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <nav className="flex flex-col p-4">
            <Link
              className="py-2 text-sm font-medium hover:underline underline-offset-4"
              href="#features"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              className="py-2 text-sm font-medium hover:underline underline-offset-4"
              href="#how-it-works"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              className="py-2 text-sm font-medium hover:underline underline-offset-4"
              href="#pricing"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Button variant="ghost" className="justify-start px-0 py-2" onClick={() => setIsMenuOpen(false)}>
              Log In
            </Button>
            <Button className="mt-2" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </Button>
          </nav>
        </div>
      )}
    </div>
  )
}

export default LandingPageNavBar