import { TbLoader2 } from "react-icons/tb";
import { smartcls } from '@/src/utils/smartclass'
import React from 'react'

/**
 * @typedef {Object} ButtonProps
 * @property {boolean} [isDisabled]
 * @property {boolean} [isLoading]
 * @property {React.ReactNode} [icon]
 * @property {(event: React.MouseEvent<HTMLButtonElement>) => void} [onClick]
 * @property {React.ReactNode} [children]
 * @property {string} [type]
 * @property {string} [className]
 */

/**
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
export default function Button({type='default', isLoading=false, isDisabled=false, icon, onClick, className=" ", children}) {
    
    const defaultStyle = "p-3 px-4 rounded-md font-semibold flex items-center gap-2 bg-foreground text-background";
    const variants = {
        default:
            "bg-foreground text-background",
        destructive:
            "bg-red-500 text-background",
        disabled:
            " bg-gray-100 text-gray-500 border  cursor-not-allowed",
        link:
            " bg-transparent text-foreground underline-offset-4 hover:underline",
        ghost: 
            "hover:bg-gray-200 ",
        icon:
            " ",
        iconleft:
            " flex-row-reverse", 
    }


    return (
        <button 
            className={smartcls(className, variants[isDisabled ?'disabled': type ],defaultStyle ) } 
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
            {icon 
                && <span className={` ${isLoading && 'animate-spin'} `}>{icon}</span>
            }
        </button>
    )
}
