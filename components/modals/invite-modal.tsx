"use client";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";


import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import { set } from "react-hook-form";


export const InviteModal = () => {

    const {isOpen,onClose,type,data,onOpen} =useModal();

    const origin = useOrigin();
const {server}= data;
  const isModalOpen = isOpen && type === "invite";
  const[isLoading,setIsLoading]=useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy=()=>{
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(()=>{
      setCopied(false);
    },2000);
  };

  const onNew = async () => {

    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen("invite",{server:response.data})


    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }

  }

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose} >
        <DialogContent className="bg-white text-black p-0 overflow-hidden ">
          <DialogHeader className="bg-white text-black p-0 overflow-hidden ">
            <DialogTitle className="bg-white text-black p-0 overflow-hidden ">
              <h1 className="text-2xl font-bold px-6 pt-2 ">Invite Friends</h1>
            </DialogTitle>
          
          </DialogHeader>
         <div className="p-6">

          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
          Server Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
          <Input 
          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
          value={inviteUrl}
          readOnly
          disabled={isLoading}
          />
          <Button disabled={isLoading} onClick={onCopy} size="icon">
            {
              copied?<Check  className="w-4 h-4 text-emerald-700"/>:
              <Copy  className="w-4 h-4" />
            }

          </Button>
          </div>
          <Button 
          disabled={isLoading}
          onClick={onNew}
          size="sm"
           className="bg-indigo-500 text-bold text-white mt-2 text-md hover:bg-indigo-500/90 ">
            Generate a new Link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
