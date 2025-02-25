import React from 'react'

function HeadingThree({children, className}) {
    return (
        <h3 className={`${className} scroll-m-20 text-2xl font-semibold tracking-tight`}>
           {children} 
        </h3>
    )
}

export default HeadingThree
