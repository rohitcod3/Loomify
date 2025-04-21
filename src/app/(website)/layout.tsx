import React from 'react'
import LandingPageNavBar from './_components/navbar'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
   <>
    <LandingPageNavBar/>
    <div className='flex flex-col  xl:px-0 container'>
      {/* Render the children (i.e. the page content) */}
      
      <main>{children}</main>
    </div>
   </>
  )
}

export default Layout
