import { client } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { subscribe } from "diagnostics_channel";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(req:NextRequest,{params}: {params:any}) {

    const {id} = await params as {
        id: string
    }
console.log('Endpoint hint')
  try{
    const userProfile = await client.user.findUnique({
        where:{
            clerkid:id,
        },
        include:{
            studio:true,
            subscription:{
                select:{
                    plan:true,
                }
            }
        }
    })
    if(userProfile)return NextResponse.json({status:200, user:userProfile})
    const clerkUserInstance = await clerkClient.users.getUser(id)
    
    const createUser = await client.user.create({
        data:{
            clerkid:id,
            email:clerkUserInstance.emailAddress[0].emailAddress,
            firstname: clerkUserInstance.firstName,
            lastname: clerkUserInstance.lastName,
            studio:{
                create: {},
            },
            workspace:{
                create:{
                    name:`${clerkUserInstance.firstName}'s workspace`,
                    type:'PERSONAL',
                }
            },
            subscription:{
                create:{
    
                },
            },
            include:{
                subscription:{
                    select:{
                        plan:true,
                    }
                }
            }
        }
    })
    if(createUser) return NextResponse.json({status:201, user: createUser})
        return NextResponse.json({status:400})
  }catch(error){
console.log(error)
  }  

}