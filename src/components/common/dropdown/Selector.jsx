"use client"
import { smartcls } from '@/src/utils/smartclass';
import React, { useRef, useState } from 'react'
import OptionItem from './OptionItem';
import OptionContainer from './OptionContainer';

export default function Selector({values, initialValue, getValue, className}) {
    const [isOpen, setIsOpne] = useState(false);
    const childRef = useRef([])
    const [selectedItem, setSelected] = useState(initialValue || (values && values[0]) || "");
    

    const defaultStyle = "group min-w-[200px] flex flex-col  justify-center relative rounded-md shadow-sm";
  
    // after this we can make varients for these two as we want just like buttons

    
    const handelKeyDown = (e)=> {
      if(childRef.current == null) return;
      const foucsableItems = childRef.current.filter((item) => item !== null);

      const ind = foucsableItems.findIndex(
        (item) => document.activeElement === item
      );

      if(e.key === 'ArrowDown'){
        e.preventDefault();
        const nextInd = (ind + 1) % foucsableItems.length;
        foucsableItems[nextInd]?.focus();
      }
      if(e.key === 'ArrowUp'){
        e.preventDefault();
        const nextInd = (ind - 1 + foucsableItems.length) % foucsableItems.length;
        foucsableItems[nextInd]?.focus();
      } else if (e.key === 'Enter'){
        setSelected(foucsableItems[ind]?.textContent || selectedItem);
        getValue(()=>foucsableItems[ind]?.textContent || selectedItem)
        setIsOpne(false)
      } else if (e.key === 'Escape'){
        setIsOpne(false)
      } 
    }

    const handelSelect = (e)=> {
      const val = e.currentTarget.textContent;
      setSelected(val);
      getValue(()=> val);
      setIsOpne(false);
    }

  return (
    <div 
      tabIndex={0}  
      onKeyDown={(e) => {
        if(e.key === 'KeyUp'){

        }
        handelKeyDown(e)
      }}
      onClick={(e) => e.currentTarget.focus()}
      className={smartcls(className, defaultStyle)}
    >
        <div 
          onClick={(e)=> {setIsOpne(!isOpen)}} className=' px-4 w-full h-[40px] bg-background rounded-md flex items-center justify-between '
        >{selectedItem}</div>

        <OptionContainer isOpen={isOpen} >
          {values && values.map((item, index) => (
            <OptionItem 
              key={index}
              ref={(r) => childRef.current[index] = r} 
              onClick={handelSelect}
            >{item}</OptionItem>
            
          ))}
        </OptionContainer>
        {/* <div 
          className={` absolute top-[calc(100%+2px)] w-full overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          {values && values.map((item, index) => (
            <OptionItem 
              key={index}
              ref={(r) => childRef.current[index] = r} 
              onClick={handelSelect}
            >{item}</OptionItem>
            
          ))}
        </div> */}
        {/* <div
            key={index}
            ref={(el) => (childRef.current[index] = el)}
            tabIndex={0}
            className={smartcls(defaultOptionStyle)}
            onClick={handelSelect}
          >
            {item}
          </div> */}
    </div>
  )
}
