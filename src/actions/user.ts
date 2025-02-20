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
    }catch(error: any){
        console.log(error)
    }
}