" use client"
import React, { forwardRef } from 'react'
import { RxCross2 } from 'react-icons/rx'

const  Modal = forwardRef(({children, closeModal}, ref)=> {
  return (
    <dialog
      ref={ref}
      className=" bg-transparent backdrop:bg-foreground/30"
      onClick={(e) => {
        if(e.currentTarget === e.target) closeModal()
      }}
    >
    <div>

      <div className=' relative'>
        {children}
        <button 
          className=' absolute top-3 right-3 bg-foreground text-background border-2 border-background outline outline-1 outline-foreground rounded-md '
          onClick={()=>{
            closeModal()}}
        ><RxCross2 /></button>
      </div>
    </div>
    </dialog>
  )
})

export default Modal;
