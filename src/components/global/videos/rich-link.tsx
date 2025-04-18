import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {title: string, id: string, source: string, description: string}

function RichLink({description, id, source,title}: Props) {
  const CopyRichText = () => {}
  function CopyRich(){
g
  }
  return (
    <Button onClick={CopyRichText}>Get Embedded Code</Button>
  )
}

export default RichLink