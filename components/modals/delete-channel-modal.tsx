"use client";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import qs from "query-string"


import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {  useRouter } from "next/navigation";


export const DeleteChannelModal = () => {

    const {isOpen,onClose,type,data} =useModal();

const {server,channel }=  data;
  const isModalOpen = isOpen && type === "deleteChannel";
  const[isLoading,setIsLoading]=useState(false);
const router = useRouter();
 const onClick=async()=>{
  try {
    const url = qs.stringifyUrl({
      url:`/api/channels/${channel?.id}`,
      query:{
          serverId:server?.id
      }
    })
    
    setIsLoading(true);
    await axios.delete(url)
 onClose();
 router.refresh();
 router.push(`/servers/${server?.id}`);

  } catch (error) {
    console.log(error);
  }finally{
    setIsLoading(false);
  }

 }

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose} >
        <DialogContent className="bg-white text-black p-0 overflow-hidden ">
          <DialogHeader className="bg-white pt-2 px-6 text-black  overflow-hidden ">
            <DialogTitle className="bg-white text-black overflow-hidden ">
              <h1 className="text-2xl font-bold  pt-2 ">Delete Channel</h1>
            </DialogTitle>
          <DialogDescription className="text-start text-zinc-500">
            Are you sure you want to Delete <span 
            className="font-semibold text-indigo-500"
            >#{channel?.name}</span>?
          </DialogDescription>
          </DialogHeader>
        <DialogFooter
        className="bg-gray-100 px-6 py-4"
        >
          <div className="flex items-center justify-between w-full">

      <Button 
      disabled={isLoading}
      onClick={onClose}
      variant="ghost"
      className="outline-0"
      > 
        Cancel
      </Button>
      <Button
       disabled={isLoading}
       onClick={onClick}
       variant="primary"
      >
        Confirm
      </Button>
          </div>
          
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
