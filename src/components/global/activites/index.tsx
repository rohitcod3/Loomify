import CommentForm from '@/components/forms/comment-form'
import { TabsContent } from '@radix-ui/react-tabs'
import React from 'react'
import CommentCard from '../comment-card'
import { useQueryData } from '@/hooks/useQueryData'
import { getVideoComments } from '@/actions/user'
import { VideoCommentProps } from '@/types/index.type'

type Props = {
    author:string
    videoId:string
}

const Activities = ({
    author,videoId
}: Props) => {

  const {data} = useQueryData(['video-comments'], () =>  
  getVideoComments(videoId)
  )
  
  const comments = (data as VideoCommentProps)?.data || [];


  return (
   <div className='p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-5'>
     <CommentForm 
     author={author}
     videoId={videoId}
     />
    {comments.map((comment) => (
     <CommentCard
     comment={comment.comment}
     key={comment.id}
     author={{
      image: comment.User?.image!,
      firstname: comment.User?.firstname!,
      lastname:comment.User?.lastname || '',
     }}
     videoId={videoId}
     reply={comment.reply}
     commentId={comment.id}
     />
    ))}
   </div>
  )
}

export default Activities