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

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import qs from "query-string"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ChannelType } from "@prisma/client";
import { useEffect } from "react";


const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter a Channel name" }).refine(
    name=>name!== "general",{
      message:"Channel name cannot be 'general'"
    },
  ),
  type: z.nativeEnum(ChannelType),
 
});

export const CreateChannelModal = () => {

    const {isOpen,onClose,type,data} =useModal();

  const router = useRouter();
  const params = useParams();
const {channelType}=data;
  const isModalOpen = isOpen && type === "createChannel";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channelType || ChannelType.TEXT,
    },
  });

  useEffect(()=>{
if(channelType){
  form.setValue("type",channelType);    
}else{
  form.setValue("type",ChannelType.TEXT);
}
  },[channelType,form])

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url= qs.stringifyUrl({
        url:"/api/channels",
        query:{
          serverId:params?.serverId
        }
      })
      await axios.post(url, values);
      form.reset();
      router.refresh();
      onClose();
      
    } catch (error) {
      console.log(error);
    }


  };

  const handleClose = () => {
    form.reset();
    onClose();
  }
 
  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={handleClose} >
        <DialogContent className="bg-white text-black p-0 overflow-hidden ">
          <DialogHeader className="bg-white text-black p-0 overflow-hidden ">
            <DialogTitle className="bg-white text-black p-0 overflow-hidden ">
              <h1 className="text-2xl font-bold px-4 pt-2 ">Create Channel</h1>
            </DialogTitle>
           
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
             
              <div className="px-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase  font-bold">Channel Name</FormLabel>
                      <FormControl >
                        <Input
                          disabled={isLoading}
                          className=" bg-zinc-300/50 text-black   border-none rounded-md w-full h-10 focus-visible:ring-0 focus-visible:ring-offset-0 "
                          placeholder="Enter a Channel name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />


                    <FormField
                    control={form.control}
                    name ="type"
                    render={({field})=>(
                      <FormItem>
                        <FormLabel>Channel Type</FormLabel>
                      <Select 
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}

                      >
                        <FormControl>
                      <SelectTrigger
                      className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none"
                      >
<SelectValue placeholder="Select a Channel type" />

                      </SelectTrigger>


                        </FormControl>
                        <SelectContent>

                          {
                            Object.values(ChannelType).map((type)=>(
                              <SelectItem key={type} value={type} className="capitalize">
                                {type.toLowerCase()}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>


                      </Select>

                      </FormItem>
                    )}
                    />

              </div>
              <DialogFooter className="p-4">
                <Button type="submit" variant="primary" disabled={isLoading} className="" >
                  Create Channel
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
