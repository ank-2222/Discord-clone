import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps{
    params:{
        inviteCode:string;
    };
};


const InviteCodePage =async({params}:InviteCodePageProps)=>{

    const profile = await currentProfile();
    if(!profile){
        return redirectToSignIn();
    }
    //if code is not there then go to home page
    if(!params.inviteCode){
         return redirect("/");
    }

    const existingServer = await db.server.findFirst({
        where:{
            inviteCode:params.inviteCode,
            members:{
                some:{
                    profileId:profile.id,
                }
            }
        },
    });
   
    //if a member is already a part of server then we redirect directly to server
    if(existingServer){
        return redirect(`/servers/${existingServer.id}`);
    }

    const server = await db.server.update({
        where:{
            inviteCode:params.inviteCode,
        },
        data:{
            members:{
                create:[
                    //we dont need to explicitly put role here as by default every member has guest role
                    {profileId:profile.id}
                ]
            }
        }
    });

    if(server){
        return redirect(`/servers/${server.id}`);
    }

   return null;
}


export default InviteCodePage;