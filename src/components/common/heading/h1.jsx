import React from 'react'

function HeadingOne({children, className}) {
    return (
        <h1
            className={` ${className} scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`}
        >{children}</h1>
    )
}

export default HeadingOne
