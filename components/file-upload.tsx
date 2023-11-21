"use client"

import { UploadDropzone } from "@/lib/uploadthing";

import Image from "next/image";
interface FileUploadProps{
    onChange:(url?:string)=>void;
    value:string;
    endpoint:"messageFile"  | "serverImage"
}

export const FileUpload=({
    onChange,
    value,
    endpoint
}:FileUploadProps)=>{
    const fileType = value?.split(".").pop()
    if(value && fileType?.match(/(png|jpg|jpeg|gif)/)){
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="relative w-24 h-24">
                    <Image alt="upload" src={value} fill objectFit="cover"  className="rounded-full" />
                </div>
                <button className="text-sm text-red-500" onClick={()=>onChange(undefined)}>Remove</button>
            </div>
        )
    }

    return (
       <UploadDropzone
       endpoint={endpoint}
       onClientUploadComplete={(res)=>{
        onChange(res?.[0].url)
       }}
       onUploadError={(error:Error)=>{
        console.log(error)
       }}
       />
    )
}