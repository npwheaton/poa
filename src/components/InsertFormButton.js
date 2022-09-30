import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import './InsertFormButton.css'

function InsertFormButton(props){
    const handleClicks = () =>{
        props.changeForm();
    }
    
return (<button className="InsertFormButton" onClick={handleClicks}>
    <span className="buttonText">Add Action</span>
    <FontAwesomeIcon icon={faPen}  className="button-icon"/>
</button>)
}
export default InsertFormButton;