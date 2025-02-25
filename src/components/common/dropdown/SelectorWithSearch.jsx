import { smartcls } from '@/src/utils/smartclass';
import React, { useRef, useState } from 'react'
import OptionContainer from './OptionContainer';
import OptionItem from './OptionItem';

export default function SelectorWithSearch({values, initialValue, getValue, className}) {
    const [isOpen, setIsOpne] = useState(false);
    const childRef = useRef([])
    const [allValues, setAllValues] = useState(values)
    const [selectedItem, setSelected] = useState("");
    const [searchValue, setSearchValue] = useState(initialValue || (values && values[0]) || "");
    

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
      setSearchValue(val)
      getValue(()=> val);
      setIsOpne(false);
    }

    const handelSearch = (e)=> {
        setIsOpne(true)
        const val = e.target.value.toLowerCase(); 
        setSearchValue(val)
        setSelected(val)
        setAllValues(values.filter((data) => data.toLowerCase().includes(val)));
    };

  return (
    <div  
      className={smartcls(className, defaultStyle)}
    >
        <div>
            <input 
                type="text" onChange={handelSearch}  
                value={searchValue}
                onKeyDown={handelKeyDown}
                className='block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400'
                placeholder={searchValue}
                
            />
        </div>

        <OptionContainer isOpen={isOpen} >
          {allValues.map((item, index) => (
            <OptionItem 
              key={index}
              ref={(r) => childRef.current[index] = r} 
              onClick={handelSelect}
            >{item}</OptionItem>
            
          ))}
        </OptionContainer>
        
    </div>
  )
}