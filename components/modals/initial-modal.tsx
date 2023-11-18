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
import { FileUpload } from "@/components/file-upload";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter a server name" }),
  imageUrl: z.string().min(1, {
    message: "Server Image is required",
  }),
});

export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);
      form.reset();
      router.refresh();
      window.location.reload();
      
    } catch (error) {
      console.log(error);
    }


  };

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <Dialog  open>
        <DialogContent className="bg-white text-black p-0 overflow-hidden ">
          <DialogHeader className="bg-white text-black p-0 overflow-hidden ">
            <DialogTitle className="bg-white text-black p-0 overflow-hidden ">
              <h1 className="text-2xl font-bold px-4 pt-2 ">Create a Server</h1>
            </DialogTitle>
            <DialogDescription className="px-4 text-black">
              Give Your Server a Name and an Icon to make it distinct.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>

                    <FormField
                    control={form.control}
                    name ="imageUrl"
                    render ={({field})=>(
                        <FormItem>
                            <FormControl>
                                <FileUpload
                                endpoint="serverImage"
                                value ={field.value}
                                onChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}

                    />

                </div>
              <div className="px-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase  font-bold">Server name</FormLabel>
                      <FormControl >
                        <Input
                          disabled={isLoading}
                          className=" bg-zinc-300/50 text-black   border-none rounded-md w-full h-10 focus-visible:ring-0 focus-visible:ring-offset-0 "
                          placeholder="Enter a server name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="p-4">
                <Button type="submit" variant="primary" disabled={isLoading} className="" >
                  Create Server
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
