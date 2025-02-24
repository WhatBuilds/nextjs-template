import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";

export default function Accordion({title, children}) {
    const [isVisible, setIsVisible] = useState(false);
    
    const toggleItem = () => {
        console.log("calling")
        setIsVisible((old) => !old)
    }
    
    return (
        <div className=' p-2 bg-background rounded-sm border-b shadow-sm'  >
            <div onClick={toggleItem} className=' px-2 flex items-center justify-between cursor-pointer' >
                <p className=' text-xl font-semibold hover:underline'>{title}</p>
                <div><FaAngleDown className={`${isVisible? 'rotate-180 ': ' rotate-0' } transition-transform duration-400`} /></div>
            </div>
            <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isVisible ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="p-2">{children}</div>
            </div>
        </div>
    )
}
