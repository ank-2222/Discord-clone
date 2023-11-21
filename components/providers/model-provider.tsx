
"use client"

import {CreateServerModal} from "@/components/modals/create-server-modal";
import { useEffect,useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import { LeaveServerModal } from "@/components/modals/leaver-server-modal";
import { DeleteServerModal } from "@/components/modals/delete-server-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
import { EditChannelModal } from "@/components/modals/edit-channel-modal copy";
import { MessageFileModal } from "../modals/message-file-modal";
import { DeleteMessageModal } from "../modals/delete-message-modal";
import { MembersModal } from "../modals/members-modal";

export const ModalProvider=()=>{

    const[isMounted,setIsMounted]=useState(false);
    useEffect(()=>{
        setIsMounted(true);
    },[]);

    if(!isMounted){
        return null;
    }

    return(
        <>
        <CreateServerModal/>
        <InviteModal/>
        <EditServerModal/>
        <CreateChannelModal/>
        <LeaveServerModal/>
        <DeleteServerModal/>
        <DeleteChannelModal/>
        <EditChannelModal/>
        <MessageFileModal/>
        <DeleteMessageModal/>
        <MembersModal/>
        </>
    )

}