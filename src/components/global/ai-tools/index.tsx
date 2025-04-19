import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import Loader from '../loader'
import { Bot, Download, File, Pencil, StarsIcon, Video } from 'lucide-react'

type Props = {
    plan?:"PRO" | 'FREE'
    trial?: boolean
    videoId?: string
}

function AiTools({plan, trial, videoId}: Props) {
  return (
    <TabsContent value="Ai tools"
    className='p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10'
    >
        {' '}
        <div className='flex items-center justify-center flex-col flex-row items-start'>

            {/* AI tools div*/}
            <div className='w-8/12 flex flex-col items-center'>
            <h2 className='text-3xl font-bold'>Ai tools</h2>
            <p className='text-[#BDBDBD]'>
             Taking your videos to the next <br className='md:block hidden'/> step with the power of AI!
            </p>
            </div>

           {/* Buttons div*/}
           <div className='flex items-center justify-between gap-2'>
           <Button className='mt-2 text-sm'>
            <Loader
            state={false}
            color='#000'
            >
                Try now
            </Loader>
            </Button> 

            <Button className='mt-2 text-sm  '
          
            >
            <Loader
            state={false}
            color='#000'
            >
                Pay now
            </Loader>
            </Button> 

            <Button className='mt-2 text-sm'>
            <Loader
            state={false}
            color='#000'
            >
                Generate Now
            </Loader>
            </Button> 

           </div>

            {/* Features div*/}
         <div className='border-[1px] rounded-xl p-4 gap-4 flex flex-col bg-[#1b0f1b7f] lg: mt-4'>
         <div className='items-start flex-col flex gap-2'>
            <h2 className='text-2xl font-bold text-[#a22fe0]'>Loomify Ai</h2>
           <StarsIcon
           color='#a22fe0'
           fill='#a22fe0'
           />

           <div className='flex gap-2 items-start'>
             <div className='p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]'>
                <Pencil color='#a22fe0'/>
             </div>
             <div className='flex flex-col'>
             <h3 className='text-md'>Summary</h3>
             <p className='text-muted-foreground text-sm'>
                Generate a description for your videos using AI.
             </p>
             </div>
           </div>

           <div className='flex gap-2 items-start'>
            <div className='p-2 rounded-full border-[#2d2d2d]  border-[2px] bg-[#2b2b2b]'>
             <File color='#a22fe0'/>
            </div>

           <div className='flex flex-col'>
           <h3 className='text-md'>Summary</h3>
           <p className='text-muted-foreground text-sm'>Generate a desciption of your video using AI.</p>
           </div>


           </div>
           <div className='flex gap-2 items-start'>
             <div className='p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b]'>
                <Bot color='#a22fe0'/>
             </div>
             <div className='flex flex-col'>
             <h3 className='text-md'>AI Agent</h3>
             <p className='text-muted-foreground text-sm'>
                Viewers can ask questions on your videos and our ai agent will respond
             </p>
             </div>
           </div>

           </div>
           
         </div>


         </div>

    </TabsContent>
  )
}

export default AiTools