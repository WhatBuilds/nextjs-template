import { smartcls } from '@/src/utils/smartclass'
import React from 'react'

export default function InputItem({id, type, label, placeholder, className, getValue, errorText}) {

  const defaultStyle = `block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-red-400 invalid:text-red-600
      focus:invalid:border-red-500 focus:invalid:ring-red-500`
  
  return (
    <div className={` w-full flex flex-col justify-center gap-2  ${errorText ? ' mb-[-3]': 'mb-4'}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input 
        type={type || "text"} 
        id={id}
        className={smartcls(className, defaultStyle)} 
        placeholder={placeholder || ''} 
        onBlur={(e)=> {getValue && getValue(e.target.value)}}  
      />
      {errorText && <p className=' text-sm mt-[-4px] text-red-600'>{errorText}</p>}
    </div>
  )
}
