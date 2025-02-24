"use client"
import React from 'react'

export default function AccordionHeader({ children , onClick }) {
  return (
    <div onClick={onClick} className="p-2 w-full flex items-center justify-between cursor-pointer">
        <div>{children}</div>
        <div>i</div>
    </div>
  )
}
