import React from "react";

function AlertMessage(props){
const StopAlert = ()=>{
    props.setAlertMessage({message:"", showAlert: false})
}
const style = {
    //height: "10%",
    //width: "40%",
    color: "black",
    padding: 20,
    border:"2px solid red",
    borderRadius: "25px",
    backgroundColor: "#F1EBF2",
    position: "absolute",
    zIndex: 10,
    top: "3%",
    left: "40%"

}
return (<span style={style}className="AlertMessage" onClick={StopAlert}>{props.message}</span>)
}
export default AlertMessage;