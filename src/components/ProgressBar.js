import React from 'react'
import Filler from './Filler'

function ProgressBar(props) {
    const {percentage} = props
    return (
        <div className="progress-bar font_style">
            <Filler percentage={percentage}>
                {props.children}
                <span>{percentage}%</span>
            </Filler>
        </div>
    )
}

export default ProgressBar