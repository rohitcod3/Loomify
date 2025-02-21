"use server"

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"


//this workspace id come from the dynamic parameters passed in at src/app/dashboard/[workspaceId]
export const verifyAccessToWorkspace = async (workspaceId: string) =>{
    try{
    const user = await currentUser()
    if(!user) return {status:403}

    const isUserInWorkpace = await client.workSpace.findUnique({
        where:{
            id: workspaceId,
            OR:[{
            User:{
                clerkid: user.id,
            },
         },
         {
            members:{
            some:{
            User:{
                clerkid:user.id,
             }, 
            },
          },
        },
       ],
      },
    })
    return {
        status: 200,
        data:{workspace: isUserInWorkpace}
    }
    }catch(error: any){
        console.log(error)
        return{
            status:403,
            data: {workspace: null},
        }
    }
}