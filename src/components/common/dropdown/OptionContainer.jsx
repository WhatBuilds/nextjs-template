import { smartcls } from '@/src/utils/smartclass'
import React from 'react'

export default function OptionContainer({children, isOpen, className}) {
    
    const defaultStyle = ` absolute top-[calc(100%+2px)] w-full overflow-hidden transition-all duration-300 ease-in-out z-50`

    return (
        <div 
            className={smartcls(`${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`, className, defaultStyle)}
        >{children}
        </div>
    )
}
