import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import './InsertFormButton.css'

function InsertFormButton(props){
    const handleClicks = () =>{
        props.changeForm();
    }
    
return (<button className="InsertFormButton" onClick={handleClicks}>
    <div className="loadinganim"></div>
    <FontAwesomeIcon icon={faCirclePlus}  className="button-icon"/>
    <span className="buttonText">Action</span>
    
</button>)
}
export default InsertFormButton;