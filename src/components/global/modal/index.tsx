import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import React from 'react'

type Props = {
    trigger: React.ReactNode
    children: React.ReactNode
    title:string
    description:string
    className?:string
}

function Modal({trigger,children,title,description,className}: Props) {
  return (<Dialog>
    <DialogTrigger 
    className={className}
    asChild
    >{trigger}</DialogTrigger>
    <DialogContent>
    <DialogHeader>
    <DialogTitle>
        {title}
    </DialogTitle>
        <DialogDescription>
         {description}
        </DialogDescription>
    </DialogHeader>
    {children}
    </DialogContent>
  </Dialog>)
}

export default Modal