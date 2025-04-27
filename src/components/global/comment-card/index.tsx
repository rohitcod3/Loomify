import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CommentRepliesProps } from '@/types/index.type';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import React, { useState } from 'react'

type Props = {
    comment:string
    author: {image:string; firstname:string, lastname:string}
    videoId: string
    commentId?: string
    reply:CommentRepliesProps[]
    isReply?: boolean
}

function CommentCard({author,comment,videoId, commentId, reply, isReply}: Props) {
    const [onReply, setOnReply] =useState<boolean>(false)
  return (
    <Card
    className={cn(
        isReply ? 'bg-[#1D1D1D] pl-10 border-none'
        : 'border-[1px] bg-[#1D1D1D] p-5'
    )}
    >
     <div>
        <Avatar>
            <AvatarImage
            src={author.image}
            alt="author"
            />
            <p className='capitalize text-sm text-[#BDBDBD]'> 
                {author.firstname} {author.lastname}
            </p>
        </Avatar>
            
    </div>   
    </Card>
  )
}

export default CommentCard