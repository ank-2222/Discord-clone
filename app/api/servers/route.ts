

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import {v4 as uuidv4} from "uuid";

export async function POST(req:Request,res:Response){
    try {
        const {name, imageUrl}=await req.json();
        //fetches current logged in user profile
        const profile = await currentProfile();
        if(!profile){
            return new NextResponse("Not Authorized",{status:404});

        }

        console.log(name,imageUrl);
        const server = await db.server.create({
            data:{
                profileId:profile.id,
                name,
                imageUrl,
                inviteCode:uuidv4(),
                channels:{
                    create:[
                        {
                            name:"general",profileId:profile.id
                            
                        }
                    ]
                },
                members:{
                  create:  [
                        {
                            profileId:profile.id,role:MemberRole.ADMIN
                        }
                    ]
                    
                }
            }
        });

        return NextResponse.json(server);
        
        
    
    } catch (error) {
        console.log("SERVER_POST",error);
        return new NextResponse("Internal Server Error",{status:500});
    }
  
}