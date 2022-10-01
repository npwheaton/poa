import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import './AlertMessage.css'

function AlertMessage(props){
const StopAlert = ()=>{
    props.setAlertMessage({message:"", showAlert: false})
}

return (<div className="AlertMessage" >
    <span className="AlertContainer" onClick={StopAlert}>
    <FontAwesomeIcon icon={faTriangleExclamation}  className="alert-icon"/>
       <span className="AlertText">{props.message}</span> 
       <div className="dismiss">Tap to dismiss</div>
    </span> 
    </div>)
}
export default AlertMessage;