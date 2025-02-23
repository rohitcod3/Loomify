"use server"

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"


//this workspace id come from the dynamic parameters passed in at src/app/dashboard/[workspaceId]
export const verifyAccessToWorkspace = async (workspaceId: string) =>{
    try{
    const user = await currentUser()
    if(!user) return {status:403}

    const isUserInWorkpace = await client.workSpace.findFirst({
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
        
        return{
            status:403,
            data: {workspace: null},
        }
    }
}

export const getWorkspaceFolders = async (workspaceId: string) => {
   try {
     const isFolders = await client.folder.findMany({
         where: {
            workSpaceId:workspaceId,
         },
         include:{
         _count:{
            select:{
                videos:true,
            }
         }
         },
     })
     if(isFolders && isFolders.length > 0){
        return{status:200, data: isFolders}
     }
     return{status:404, data: {}}
   } catch (error: any) {
    return{status:500, data:[]}
   }
}

export const getAllUserVideos = async (workspaceId: string) => {
try{
 const user = await currentUser();
 if(!user) return {status: 404}

 const videos = await client.video.findMany({
    where:{
    OR: [{workSpaceId: workspaceId}, {folderId:workspaceId }],   
    },
    select:{
    id: true,
    title:true,
    createdAt: true,
    source: true,
    processing: true,
    Folder:{
        select:{
            id:true,
            name: true,
        },
    },
    User:{
        select:{
            firstname:true,
            lastname:true,
            image:true,
        },
    },
    
},
orderBy: {
    createdAt:'asc'
}
 })

 if(videos && videos.length > 0){
    return {status:200, data:videos}
 }
 return {status: 404}
}catch(error: any){
return {status: 400}
}
}
 
export const getWorkspaces = async () => {
   try {
    const user = await currentUser();
    if(!user){
        return {status:404}
    }
    const workspaces = await client.user.findUnique({
        where:{
            clerkid:user.id,
        },
        select: {
            subscription:{
                select:{
                    plan:true,
                },
            },
            WorkSpace:{
            select:{
                id:true,
                name:true,
                type:true,
            }
            }, 
            members:{
                select:{
                    WorkSpace:{
                        select:{
                            id:true,
                            name:true,
                            type:true,
                        },
                    },
                },
            },
        }
    })
    if(workspaces){
        return {status: 200, data:workspaces}
    }
   } catch (error: any) {
    return {status: 400}
   }
}

