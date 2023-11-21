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


import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";


export const DeleteServerModal = () => {

    const {isOpen,onClose,type,data} =useModal();

const {server}= data;
  const isModalOpen = isOpen && type === "deleteServer";
  const[isLoading,setIsLoading]=useState(false);
const router = useRouter();
 
 const onClick=async()=>{

  try {
    
    setIsLoading(true);
    await axios.delete(`/api/servers/${server?.id}`)
 onClose();
 router.refresh();
 router.push("/");

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
              <h1 className="text-2xl font-bold  pt-2 ">Delete Server</h1>
            </DialogTitle>
          <DialogDescription className="text-start text-zinc-500">
            Are you sure you want to Delete <span 
            className="font-semibold text-indigo-500"
            >{server?.name}</span>?
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
