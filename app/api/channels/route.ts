import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { requestToBodyStream } from "next/dist/server/body-streams";
import { NextResponse } from "next/server";


export async function POST(
    req:Request
){
    try {
        const{name,type}= await req.json();
        const {searchParams}= new URL(req.url);

        const serverId = searchParams.get("serverId");

        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Not Authorized",{status:404});
        }

        if(!serverId){
            return new NextResponse("Server Id Not Found",{status:404});
        }

        if(name.toLowerCase() === "general"){
            return new NextResponse("Channel Name cannot be 'general'",{status:400});
        }



        const server = await db.server.update({
            where:{
                id:serverId,
                members:{
                    some:{
                        profileId:profile.id,
                        role:{
                            in:[MemberRole.ADMIN,MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data:{
                channels:{
                    create:{
                        profileId:profile.id,
                        name,
                        type
                    }
                }
            }
        })

        return NextResponse.json(server);

    } catch (error) {
        console.log("CHANNEL_POST",error);
        return new NextResponse("Internal Server Error",{status:500});
    }
}