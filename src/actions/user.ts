"use server"

import { currentUser } from "@clerk/nextjs/server"
import { client } from "@/lib/prisma"




export const onAuthenticatedUser = async () => {
    try{
    const user = await currentUser()
    // console.log('Current User: ', user);
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
    // console.log("USER EXITS",userExists);
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
        // console.log(error)
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

 export const searchUsers = async (query:string) => {
  try{
  const user = await currentUser();
  if(!user) return {status:404}

  const users = await client.user.findMany({
    where:{
        OR: [{firstname: {contains: query}},
            {email : {contains: query}},
            {lastname:{contains: query}}
         ],
         NOT:[{clerkid: user.id}],
    },
    select:{
        id:true,
        subscription:{
            select:{
                plan:true,
            },
        },
        firstname:true,
        lastname:true,
        image:true,
        email:true,
    }
  })
  if(users && users.length > 0){
    return {status:200, data:users}
  }
  return{staus:404,data:undefined}
  }catch(error){
  return{status:500, data:undefined}
  }
 }


 export const getPaymentInfo = async() => {
    try{
        const user = await currentUser();
        if(!user){
            return{status : 404}
        }
        const payment = await client.user.findUnique({
            where:{
                clerkid: user.id,
            },
            select:{
                subscription:{
                    select: {plan: true},
                },
            },
        })

        if(payment){
            return{status:200, data:payment}
        }
    }catch(error){
     return {status:400}
    }
 }

 export const getFirstView = async () => {
    try{
   const user = await currentUser();
   if(!user){
    return {status: 404}
   }
   const userData = await client.user.findUnique({
    where:{
        clerkid:user.id
    },
    select:{
        firstView: true,
    },
   })
   if(userData){
    return {status: 200, data: userData.firstView}
   }
   return {status:400, data:false}
    }catch(error){
    return {status:400}
    }
 }

 export const enableFirstView = async (state:boolean) => {
    try{
        const user = await currentUser();
        if(!user)return{status:404}
        const view = await client.user.update({
            where:{
                clerkid:user.id,
            },
            data:{
                firstView:state,
            }
        })

        if(view){
            return {status:200, data:'Setting updated'}
        }
    }catch(error){
     return {status: 400}
    }
 }

 export const createCommentAndReply = async(
    userId: string,
    comment:string,
    videoId:string,
    commentId?: string | undefined
 ) => {
try{

const reply = await client.comment.update({
    where:{
        id:commentId,
    },
    data:{
       reply:{
        create:{
            comment,
            userId,
            videoId,
        }
       } 
    }
})
if(reply){
    return {status:200, data:'Reply posted'}
}

const newComment = await client.video.update({
    where: {
        id:videoId,
    },
    data:{
        Comment:{
            create:{
                comment,
                userId,
            }
        }
    }
})
if(newComment) return {status:200,data:'New comment added'}
}catch(error){
return {status:400}
}
 }