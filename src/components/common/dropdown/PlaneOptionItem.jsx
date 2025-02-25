"use client"
import { smartcls } from '@/src/utils/smartclass';
import React, { forwardRef } from 'react'

export default function  PlaneOptionItem({onClick,children, className}) {

    const defautlStyle = "px-4 w-full h-[40px] bg-background rounded-sm border-b flex items-center cursor-pointer focus:bg-green-200 focus:ring-2 focus-within:outline-blue-300  focus-within:bg-green-500 hover:bg-green-400";

    return (
    <div
        className={smartcls(className, defautlStyle)}
        onClick={onClick}
    >
        {children}
    </div>
    )
};
