'use client';
import React from 'react'
import HeadingFive from '../heading/h5'
import BodyThree from '../description/Body3'
import { RxCross2 } from "react-icons/rx";

export default function Toast({title, description, action, duration=300, className}) {
  const toastStyle = {
    
  }

  return (
    <div className={` pr-10 fixed ${className} p-4 w-[calc(100vw-1rem)] md:max-w-[400px] bottom-5 right-2 flex items-center justify-between gap-3 bg-background rounded-md shadow-md toast-error`}>
        <div className=' flex flex-col gap-1'>
            <HeadingFive
                text={title}
            />
            <BodyThree
                text={description}
            />
        </div>
        <button className=' absolute top-3 right-3 bg-foreground text-background border-2 border-background outline outline-1 outline-foreground rounded-md '><RxCross2 /></button>
        <button className=' p-3 px-4  bg-card  rounded-md'>Cancel</button>
    </div>
  )
}
