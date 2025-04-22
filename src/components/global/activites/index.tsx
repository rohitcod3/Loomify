import CommentForm from '@/components/forms/comment-form'
import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'

type Props = {
    author:string
    videoId:string
}

const Activities = ({
    author,videoId
}: Props) => {
  return (
   <div className='p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-5'>
    <CommentForm/>
   </div>
  )
}

export default Activities