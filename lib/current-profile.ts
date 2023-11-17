 import { auth } from "@clerk/nextjs";
 import { db } from "./db";


 export const currentProfile = async()=>{
    //this fetch current loggedin userid and if not found means user is not logged in
    const {userId}= auth();
 
    if(!userId){
        return null;
    }
    //fetches profile of current logged in user
    const profile = await db.profile.findUnique({
        where:{
            userId
        }
    });

    return profile;

}