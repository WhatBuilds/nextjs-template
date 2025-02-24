"use client"
import React, { useRef, useState } from 'react'

export default function TooltipProvider({children, text}) {
    const wrapperRef = useRef(null);
    const [isVisible , setIsVisible] = useState(false)
    const [isTopAvailable, setIsTopAvailable] = useState(true)
    

    
    const handelMousEnter = ()=> {
        setIsVisible(true)
        const box = wrapperRef.current.getBoundingClientRect();
        // we can chek for the left and right as well 
        // but still have an issu like if we have assigned childrent margin then 100% wont work as it should be 
        // so either we will have pass the ref of the child
        // so i have work on that as well 

        const spaceTop = box.top;
        const spaceBottom =box.bottom;

        if(spaceTop >= box.height){
            setIsTopAvailable(true)
            return;
        } else if (spaceBottom > spaceTop) {
            setIsTopAvailable(false)
        }
    }    
    const handelMousLeave = ()=> {
        setIsVisible(false)
        setIsTopAvailable(true)
    }    

    return (
        <div ref={wrapperRef} className=' relative' onMouseEnter={handelMousEnter} onMouseLeave={handelMousLeave}>
            {children}
            <div className={` ${isVisible ? "block" :"hidden"} w-fit text-nowrap bg-background shadow-md rounded-md p-1 px-2 absolute left-0 right-0 mx-auto ${isTopAvailable ?" bottom-[100%]":" top-[100%]"} `}>{text}</div>
        </div>
    )
}
