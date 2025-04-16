'use client'
import { getWorkspaces } from '@/actions/workspace'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useQueryData } from '@/hooks/useQueryData'
import { NotificationProps, WorkspaceProps } from '@/types/index.type'
import { Menu, MountainIcon, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import Modal from '../modal'
import Search from '../search'
import { MENU_ITEMS } from '@/constants'
import { getNotifications } from '@/actions/user'
import SidebarItem from './sidebar-items'
import WorkspacePlaceholder from './workspace-placeholder'
import GlobalCard from '../global-card'
import { Button } from '@/components/ui/button'
import Loader from '../loader'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import InfoBar from '../info-bar'
import { useDispatch } from 'react-redux'
import { WORKSPACES } from '@/redux/slices/workspaces' 
type Props = {
    activeWorkspaceId: string
}

//activeWorkspaceId comes from /dashboard/[workspaceId]/layout.tsx
const Sidebar = ({activeWorkspaceId}: Props) => {
    const router = useRouter()
    const pathName = usePathname()
    const dispatch = useDispatch()
    //
    const {data,isFetched} = useQueryData(["user-workspaces"], getWorkspaces)

    const menuItems = MENU_ITEMS(activeWorkspaceId)
    console.log("Rendering sidebar with menu items", MENU_ITEMS(activeWorkspaceId));
    const{data: notifications} = useQueryData(["user-notifications"], getNotifications)

    const {data:workspace} = data as WorkspaceProps

    const {data:count} = notifications as NotificationProps

    console.log(workspace)
    const onChangeActiveWorkspace = (value : string) => {
        router.push(`/dashboard/${value}`)
    }
    const currentWorkspace = workspace?.workspace?.find((s)=> s.id === activeWorkspaceId)

     
    if(isFetched && workspace){
      dispatch(WORKSPACES({workspaces: workspace?.WorkSpace}))
    }
    console.log("Checking WORKSPACE IN CHANGE VIDEO FOLDER", workspace?.WorkSpace)

    console.log("this is the workspace id in sidebar component",activeWorkspaceId)

    const SidebarSection =  (
    <div className='bg-[#111111] flex-none gap-4 relative p-4 h-full w-[250px] flex flex-col items-center overflow-hidden'>
        <div className='bg-[#111111] p-4 flex gap-2 justify-center items-center mb-1 top-0 left-0 right-0'>
        <MountainIcon
        height={60}
        />
        <p className='text-2xl text-white'>Loomify</p>
        </div>
        <Select  
        defaultValue="{activeWorkspaceId}"
        onValueChange={onChangeActiveWorkspace} >
            <SelectTrigger className='mt-4 text-neutral-400 bg-transparent'>
                <SelectValue placeholder="Select a workspace"></SelectValue>
            </SelectTrigger>
            <SelectContent className='bg-[#111111] backdrop-blur-xl'>
            
            <SelectGroup>
                <SelectLabel>Workspaces</SelectLabel>
                <Separator/>
            {workspace?.WorkSpace?.map((workspace:any) => (<SelectItem key={workspace.id} value={workspace.id}>{workspace.name}</SelectItem>))}
            {workspace.members.length > 0 && workspace.members.map((workspace) => 
                workspace.Workspace && <SelectItem value={workspace.Workspace.id}
                key={workspace.Workspace.id}
                >{workspace.Workspace.name}</SelectItem>
            )}
            </SelectGroup>

            </SelectContent>
        </Select>
   {currentWorkspace?.type === "PUBLIC" && workspace.subscription?.plan == 'PRO' && (<Modal 
    title="Invite to Workspace" 
    trigger={<span className='text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px]' >
    <PlusCircle size={15} className='text-neutral-800/90 fill-neutral-500'/>
    <span className='text-neutral-400 font-semibold text-xs'>
        Invite To Workspace
    </span>
    </span>}
    description="Invite other users to your workspace"
    >
       <Search workspaceId={activeWorkspaceId}/>
    </Modal>)}
    <p className='w-full text-[#9d9d9d] font-bold mt-4'> Menu </p>
    <nav className='w-full'>
    <ul>{menuItems.map((item) => (
        
        
       <SidebarItem
       href={item.href}
       icon={item.icon}
       selected={pathName===item.href}
       title={item.title}
       key={item.title}
       notifications={
        (item.title === 'Notifications' &&
        count._count &&
        count._count.notification) || 0
       }
       
       />
       
       
    ))}</ul>
    </nav>
    <Separator className='w-4/5 '/>
    <p className='w-full  text-[#9d9d9d] font-bold mt-4'>Workspaces</p>
    {workspace.WorkSpace?.length === 1 &&
            workspace.members.length === 0 && (
            <div className='w-full mt-[-10px]'>
                <p className='text-[#3c3c3c] font-medium text-sm'>
                    {workspace.subscription?.plan === 'FREE' ? 'Upgrade to create workspaces' : 'No workspaces'}
                    </p>
            </div>
            )
            }
    <nav className='w-full'>
        <ul className='h-[150px] overflow-auto overflow-x-hidden fade-layer '>
            {workspace?.WorkSpace?.length > 0 && workspace?.member?.map((item)=> 
            (
           
            <SidebarItem
            href={`/dashboard/${item.id}`}
            selected={pathName === `/dashboard/${item.id}`}
            title={item.name}
            notifications={0}
            key={item.name}
            icon={
            <WorkspacePlaceholder>
            {item.name.charAt(0)}
            </WorkspacePlaceholder>
            }

            />
            
            ))}
          
        </ul>
    </nav>
    <Separator className='w-4/5'/>
    {workspace.subscription?.plan === 'FREE' && <GlobalCard
    title="Upgrade to pro"
    description='Unlock AI features like transcription, AI summary, and more.'
    footer={
        <Button className='text-sm'>
        <Loader color='#000' state={false}>Upgrade</Loader>
    </Button>
    }
    >
      
    </GlobalCard>}
    </div>
  )
  return( <div className='full'>
    <InfoBar/>
    <div className='md:hidden fixed my-4'>
    <Sheet>
        <SheetTrigger
        asChild
        className='ml-2'
        >
        <Button variant={"ghost"} 
        className='mt-[2px]'
        >
        <Menu/>
        </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className='h-full w-fit p-0'>
            {SidebarSection}
        </SheetContent>
    </Sheet>
    </div>

    <div className='md:block hidden h-full'>
    {SidebarSection}
    </div>
    </div>
    )

}

export default Sidebar