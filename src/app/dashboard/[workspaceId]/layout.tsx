import { onAuthenticatedUser } from '@/actions/user'
import { verifyAccessToWorkspace } from '@/actions/workspace'
import { redirect } from 'next/navigation'
import React from 'react'
import {dehydrate,HydrationBoundary, QueryClient} from '@tanstack/react-query'
type Props = {
    params: {workspaceId: string}
    children: React.ReactNode
}

const Layout = async ({params: {workspaceId}, children}:Props) => {
    //to make sure the user is logged in
    const auth = await onAuthenticatedUser()
    //to satisfy typescript errors
    if(!auth.user?.WorkSpace) redirect('/auth/sign-in')
    if(!auth.user?.WorkSpace.length) redirect('/auth/sign-in')
    //this server action helps us to look through the workspaces in our databases and It tells the user if they can have access to the workspace or not
    const hasAccess = await verifyAccessToWorkspace(workspaceId)
    
    //If the status isn't 200 (meaning access is denied or an error occurred), it redirects the user to the dashboard URL using the first workspace ID from auth.user?.WorkSpace. This suggests that the first workspace might be considered a default or fallback workspace for the user.
    if(hasAccess.status !== 200){
        redirect(`/dashboard/${auth.user?.WorkSpace[0].id}`)
    }
    
    if(!hasAccess.data?.workspace) return null

    const query = new QueryClient();
    await query.prefetchQuery({
        queryKey:["workspace-folders"],
        queryFn:() => getWorkspaceFolders(workspaceId),
    })
  return (
    <div>Layout</div>
  )
}

export default Layout