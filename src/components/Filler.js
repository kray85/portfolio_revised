import React from 'react'

function Filler(props) {
    return (
        <div className="filler" style={{ width: `${props.percentage}%` }}>
            <span className="progress-text">{props.children}</span>
        </div>       
    )
}

export default Filler