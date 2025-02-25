import React from 'react'

function HeadingTwo({children, className}) {
    return (
        <h2 className={` ${className} scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 `}>
            {children}
        </h2>
    )
}

export default HeadingTwo
