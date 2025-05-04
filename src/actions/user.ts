"use server"

import { currentUser } from "@clerk/nextjs/server"
import { client } from "@/lib/prisma"
import nodemailer from "nodemailer"

export const sendEmail = async(
    to: string,
    subject: string,
    text: string,
    html?: string
) => {
  const transporter =  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,

    },
  })

  const mailOptions = {
    to,
    subject,
    text,
    html,
  }
  return {transporter, mailOptions}
}



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

if(commentId){
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
}

const newComment = await client.video.update({
    where: {
        id:videoId,
    },
    data:{
        comment:{
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

 export const getUserProfile = async () => {
    try{
        const user = await currentUser();
        if(!user) return {status: 404}
        const profileIdAndImage = await client.user.findUnique({
            where:{
                clerkid: user.id,
            },
            select:{
                image:true,
                id:true,
            }
        })
        if(profileIdAndImage)return {status:200, data:profileIdAndImage}
    }catch(error){
        return {status: 400}
    }
 }

 export const getVideoComments = async(id:string) => {
    try{
    const comments = await client.comment.findMany({
        where:{
            OR: [{videoId: id}, {commentId: id}],
            commentId:null,
        },
        include:{
            reply:{
                include:{
                    User: true,
                },
            },
            User:true,
        },
        
    })

  return {status: 200, data: comments}
    }catch(error){
return{status:400}
    }
 }


 export const inviteMembers = async (
    workspaceId:string,
    recieverId: string,
    email:string
 ) => {
   try{
   const user  = await currentUser()
   if(!user) return {status: 404}
   const senderInfo = await client.user.findUnique({
    where:{
        clerkid:user.id,
    },
    select:{
        id:true,
    }
   })
   if(senderInfo?.id){
    const workspace = await client.workSpace.findUnique({
        where:{
            id:workspaceId,
        },
        select:{
            name:true,
        },
    })
    if(workspace){
        const invitation = await client.invite.create({
            data:{
                senderId: senderInfo.id,
                recieverId,
                workSpaceId:workspaceId,
                content: `You are invited to join ${workspace.name} Workspace, click to accept to confirm`,
            },
            select:{
                id:true,
            }

        })
        await client.user.update({
            where:{
                clerkid:user.id,
                
            },
            data:{
                notification:{
                    create:{
                        content:`${user.firstName} ${user.lastName} invited ${senderInfo}`
                    },
                },
            },
        })
        if(invitation){
          const {transporter, mailOptions} = await sendEmail(email, "You got an invitation",
            `You are invited to join ${workspace.name} Workspace, click accept to confirm`,
            `<a href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}" style="background-color:#000; padding: 5px 10px; border-radius: 10px;">Accept invite</a>`
          )
          transporter.sendMail(mailOptions, async(error,info)=> {
            if(error){
                console.log(error.message)
            }else{
                console.log('email send', info)
            }
          })
          return {status: 200, data:'invite sent'}
        }
        return{status:400, data:'invitation failed'}
    }
    return {status:404, data:'workspace not found'}
   }
   return {status: 404, data: 'recipient not found'}
   }catch(error){
   return {status:400, data: 'Oops! something went wrong'}
   }
 }

//  export const inviteMembers = async (
//     workspaceId: string,
//     recieverId: string,
//     email: string
//   ): Promise<{ status: number; data: string }> => {
//     try {
//       // 1) Ensure user is signed in
//       const current = await currentUser();
//       if (!current) return { status: 401, data: 'Not authenticated' };
  
//       // 2) Load sender info (including name for notifications)
//       const sender = await client.user.findUnique({
//         where: { clerkid: current.id },
//         select: { id: true, firstname: true, lastname: true }
//       });
//       if (!sender) return { status: 404, data: 'Sender not found' };
  
//       // 3) Load workspace name
//       const workspace = await client.workSpace.findUnique({
//         where: { id: workspaceId },
//         select: { name: true }
//       });
//       if (!workspace) return { status: 404, data: 'Workspace not found' };
  
//       // 4) Create the invitation record
//       const invitation = await client.invite.create({
//         data: {
//           senderId: sender.id,
//           recieverId,
//           workSpaceId: workspaceId,
//           content: `You are invited to join ${workspace.name} Workspace. Click to accept.`
//         },
//         select: { id: true }
//       });
  
//       // 5) Add an in‐app notification on the *recipient* user
//       await client.user.update({
//         where: { id: recieverId },
//         data: {
//           notification: {
//             create: {
//               content: `${sender.firstname} ${sender.lastname} invited you to join "${workspace.name}"`
//             }
//           }
//         }
//       });
  
//       // 6) Send the email 
//       const { transporter, mailOptions } =  await sendEmail(
//         email,
//         'You’ve got an invitation!',
//         `You are invited to join ${workspace.name} Workspace—click below to accept:`,
//         `<a href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}"
//             style="background-color:#000; color:#fff; padding:8px 12px; border-radius:4px;
//                    text-decoration:none; display:inline-block;">
//            Accept Invitation
//          </a>`
//       );
//       await transporter.sendMail(mailOptions);
  
//       return { status: 200, data: 'Invitation sent successfully' };
//     } catch (err) {
//       console.error('inviteMembers error:', err);
//       return { status: 500, data: 'Server error: please try again later' };
//     }
//   };
  


export const acceptInvite = async (inviteId: string) => {
    try{
    const user = await currentUser()
    if(!user)
        return{
    status:404,
}
    const invitation = await client.invite.findUnique({
        where:{
            id: inviteId,
        },
        select:{
            workSpaceId:true,
            reciever:{
                select:{
                    clerkid:true,
                }
            }
        }
    })
    if(user.id !== invitation?.reciever?.clerkid)return {status: 401}
    const acceptInvite =  client.invite.update({
        where:{

            id: inviteId,
        },
    
    data:{
       accepted:true, 
    },
    })
    const updateMember = client.user.update({
        where:{
            clerkid:user.id,
        },
        data:{
            members:{
                create:{
                    workSpaceId:invitation.workSpaceId,
                }
            }
        }
    })
     
    const membersTransaction = await client.$transaction([
        acceptInvite,
        updateMember,

    ])
    if(membersTransaction){
        return{status:200}
    }
    return{status:400}
    }catch(error){
     return{status: 400}
    }
}