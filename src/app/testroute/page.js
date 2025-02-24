"use client"
import Accordion from '@/src/components/common/accordion/accordion'
import Modal from '@/src/components/common/modal/Modal'
import Button from '@/src/components/common/Button'
import Toast from '@/src/components/common/toast/Toast'
import TooltipProvider from '@/src/components/common/tooltip/TooltipProvider'
import TestCardInModal from '@/src/components/testcompo/TestCardInModal'
import React, { useRef } from 'react'
import { LuLoader } from "react-icons/lu";

export default function Page() {
  const modalRef = useRef(null);

  const toggleModal = ()=>{
      if(!modalRef.current) return;
      if(modalRef.current.hasAttribute("open")){
          modalRef.current.close()
      } else {
          modalRef.current.showModal()
      }
  }


    
  return (
    <div className=' bg-indigo-50 min-h-screen flex flex-col items-center justify-center gap-2'>
      <button onClick={toggleModal} className=' p-3 px-4 rounded-md bg-foreground text-background '> opne modal</button>
      <TooltipProvider  text="this is test">
        <button onClick={toggleModal} className=' bg-red-300 p-3 px-4 rounded-md bg-foreground text-background '> show tooltip</button>
      </TooltipProvider>
      <Button > default</Button>
      <Button type='destructive' > distructive</Button>
      <Button type='disabled' >disabled</Button>
      <Button type='link' >link</Button>
      <Button isLoading={true} icon={<LuLoader />} >loading</Button>
      <Button type='iconleft' icon={<LuLoader />} >icon left</Button>
      <Button isDisabled={true} >diaabled using condition </Button>
      <Button onClick={toggleModal} >onClick show modal </Button>
      <Button className=' bg-indigo-500 rounded-full' >styled by adding exterenal class </Button>
      <Modal
        ref={modalRef}
        toggle={toggleModal}
      >
        <TestCardInModal />
      </Modal>
      <Accordion
        title="how this will work?"
      >
        this text will be the hidden text that we want to show on click
      </Accordion>
      <Toast 
        title="This is the test toast"
        description="assume it as a normal toast"
      />
    </div>
  )
}
