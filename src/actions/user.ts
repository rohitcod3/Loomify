"use server"

import { currentUser } from "@clerk/nextjs/server"
import { client } from "@/lib/prisma"


export const onAuthenticatedUser = async () => {
    try{
    const user = await currentUser()
    if(!user){
        return {status: 403}
    }

    const userExists = await client.user.findUnique({
        where:{
            clerkid: user.id,
        },
        include:{
           WorkSpace:{
           where:{
            User: {
            clerkid: user.id,
            },
           },
           },
        },
    })
    if(userExists){
        return{status: 200, user:userExists}
    }
    const newUser = await client.user.create({
        data:{
            clerkid: user.id,
            email: user.emailAddresses[0].emailAddress,
            firstname: user.firstName,
            lastname:user.lastName,
            image: user.imageUrl,
            studio: {
                create:{},
            },
            subscription:{
                create: {},
            },
            WorkSpace:{
                create: {
                    name: `${user.firstName}'s Workspace`,
                    type: 'PERSONAL',
                }
            },
        },
        include:{
            WorkSpace:true,
        },
    })
    if(newUser){
        return {status: 201, user: newUser}
    }
    return {status: 400}
    }catch(error: any){
        console.log(error)
        return{status:500}
    }
}

export const getNotifications = async() => {
    try{
     const user = await currentUser();
     if(!user){
         return{status:404}
     }
     const notifications = await client.user.findUnique({
         where:{
             clerkid: user.id
         },
         select:{
            notification:true,
            _count:{
                select:{
                    notification:true,
                }
            }
         }
     })
     if(notifications && notifications.notification.length > 0){
         return {status: 200, data: notifications}
     }
     return {status:404, data:[]}
    }catch(error:any){
     return{status:400,data:[]}
    }
 } 