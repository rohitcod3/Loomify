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

export const createWorkspace = async (name: string) => {
    try{
    const user = await currentUser();
    if(!user)return {status: 404}
    const authorized = await client.user.findUnique({
    where :{
        clerkid: user.id,
    },
    select:{
        subscription:{
            select:{
                plan: true,
            },
        },
    },
    })

    if(authorized?.subscription?.plan === 'PRO')
    {
        const workspace = await client.user.update({
            where: {
                clerkid:user.id,
            },
            data:{
                workspace:{
                    create:{
                        name,
                        type:'PUBLIC'
                    }
                }
            }
        })
    
    if(workspace){
        return {status:201, data:"Workspace created"}
    }
   } 
    return {status: 401, data:"You are not authorized to create a workspace"}
    }catch(error){
    return {status: 400}
    }
}

export const renameFolders = async (folderId: string, name: string) => {
    try {
      const folder = await client.folder.update({
        where: { id: folderId },
        data: { name },
      });
      console.log("Updated folder:", folder); // Check if this shows the new name
      return {
        status: 200,
        message: "Folder renamed successfully",
        data: folder,
      };
    } catch (error) {
      console.error("Rename error:", error);
      return {
        status: 500,
        message: "Oops! Something went wrong",
      };
    }
  };
  
  


export const createFolder = async (
  workspaceId: string,
  newFolder: { name: string; id: string }
) => {
  console.log("Incoming to createFolder:", newFolder)

  if (!newFolder) {
    console.error("newFolder is undefined!")
    throw new Error("Missing folder data")
  }

  try {
    const result = await client.workSpace.update({
      where: { id: workspaceId },
      data: {
        folders: {
          create: {
            name: newFolder.name,
          },
        },
      },
    })

    return { status: 200, message: "Folder created" }
  } catch (error) {
    console.error("Error creating folder:", error)
    return { status: 500, message: "Something went wrong" }
  }
}
