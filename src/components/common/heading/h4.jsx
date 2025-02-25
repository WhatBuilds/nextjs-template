import React from 'react'

function HeadingFour({children, className}) {
    return (
        <h4 className={`${className} scroll-m-20 text-xl font-semibold tracking-tight`}>
            {children}
        </h4>
    )
}

export default HeadingFour
