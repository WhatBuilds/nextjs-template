" use client"
import React, { forwardRef } from 'react'
import { RxCross2 } from 'react-icons/rx'



const  Modal = forwardRef(({children, toggle}, ref)=> {
  return (
    <dialog
      ref={ref}
      className=" bg-transparent backdrop:bg-foreground/30"
      onClick={(e) => {
        if(e.currentTarget === e.target) toggle()
      }}
    >
    <div>

      <div className=' relative'>
        {children}
        <button 
          className=' absolute top-3 right-3 bg-foreground text-background border-2 border-background outline outline-1 outline-foreground rounded-md '
          onClick={()=>{
              console.log("hello")
             toggle()}}
        ><RxCross2 /></button>
      </div>
    </div>
    </dialog>
  )
})

export default Modal;
