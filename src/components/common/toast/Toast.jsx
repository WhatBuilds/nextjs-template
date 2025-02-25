'use client';
import React, { useEffect, useState } from 'react'
import BodyThree from '../description/Body3'
import HeadingFour from '../heading/h4';
import { smartcls } from '@/src/utils/smartclass';
import {motion, AnimatePresence} from "framer-motion"

export default function Toast({ type, title, description, duration=5000, className}) {
  const [isOpen, setIsOpne] = useState(true)

  const defaultStyle = "fixed top-5 right-2 p-4 w-[calc(100vw-2rem)] md:max-w-[400px] flex items-center justify-between gap-3 bg-background rounded-md ";
  const variants = {
    default:
        "bg-background text-forground",
    error:
        "bg-red-50 border-[3px] border-red-400",
    success:
        " bg-green-50 border-[3px] border-green-400", 
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpne(false)
    }, duration);

    return () => clearTimeout(timer);
  }, [duration])
  

  return (
    <AnimatePresence>
      { isOpen && 
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ x: 60, opacity: 0 }}
          transition={{ duration: 0.3 , ease: "easeInOut"}}
        className={smartcls(className, variants[type], defaultStyle ) }
      >
          <div className=' flex flex-col gap-1'>
              <HeadingFour>{title}</HeadingFour>
              <BodyThree
                  text={description}
              />
          </div>
      </motion.div>}
    </AnimatePresence>
  )
}
