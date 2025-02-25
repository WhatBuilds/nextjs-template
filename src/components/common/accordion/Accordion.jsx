import React, { useState } from 'react'
import {  FaMinus, FaPlus } from "react-icons/fa6";

export default function Accordion({title, children}) {
    const [isVisible, setIsVisible] = useState(false);
    
    const toggleItem = () => {
        setIsVisible((old) => !old)
    }
    
    return (
        <div className='p-3 bg-background rounded-md border-b shadow-sm'  >
            <div onClick={toggleItem} className='group  px-2 flex items-center justify-between cursor-pointer' >
                <p className=' text-xl font-semibold group-hover:underline'>{title}</p>
                <div className=' flex items-center justify-center'>
                    {isVisible
                        ? <FaMinus className={`scale-100 transition-transform duration-400`} />
                        : <FaPlus  className={`scale-100 transition-transform duration-400`} />
                    }
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isVisible ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="p-2">{children}</div>
            </div>
        </div>
    )
}
