import React from 'react'
import '../components/css/Contact.css'

function TextError(props) {
    return (
        <div className='error'>
            {props.children}
        </div>
    )
}

export default TextError
