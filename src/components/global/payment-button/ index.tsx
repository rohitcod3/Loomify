import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { useSubscription } from '@/hooks/useSubscription'

type Props = {}

function  PaymentButton({}: Props) {
    const {onSubscribe, isProcessing} = useSubscription()
  return (
    <Button className='text-sm w-full'>
      <Loader 
      color='#000'
      state={false}
      >
       Upgrade
      </Loader> 
    </Button>
  )
}

export default  PaymentButton