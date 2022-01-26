import React from 'react'
import '../styles/Popup.css'

function Popup(props) {
    return (props.trigger) ? (
        <div className="Popup">
            <div className='popup-inner'>
                <button className='close_button' onClick={() => props.setTigger(false)}>Close</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup