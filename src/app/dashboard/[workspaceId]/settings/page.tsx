'use client'
import { enableFirstView, getFirstView } from '@/actions/user'
import { Switch } from '../../../../components/ui/switch'
import React, { useEffect, useState } from 'react'
import { Label } from '../../../../components/ui/label'
import { toast } from 'sonner'

type Props = {}

const SettingsPage = (props: Props) => {
    const [firstView, setFirstView] = useState<undefined | boolean>(undefined)

    useEffect(() => {
        if(firstView !== undefined)return
        const fetchData = async () => {
            const response = await getFirstView()
            if(response.status === 200) setFirstView(response?.data)
        }
    fetchData()
    }, [firstView])

    const switchState = async (checked: boolean) => {
        const view = await enableFirstView(checked)
        if(view){
            toast(view.status === 200 ? 'Success' : 'Failed',{
                description:view.data,
            })
        }
    } 
  return (
    <div>
        <h2>Video Sharing Settings</h2>
        <p>
            Enabling this feature will send you notifications when someone watched your video for the first time. This features can help during client outreach.
        </p>
        <Label className='flex items-center gap-x-3 mt-4 text-md'>
            Enable First View
            <Switch
            onCheckedChange={switchState}
            disabled={firstView === undefined}
            checked={firstView}
            onClick={() => setFirstView(!firstView)}
            />
        </Label>

     
    </div>
  )
}

export default SettingsPage