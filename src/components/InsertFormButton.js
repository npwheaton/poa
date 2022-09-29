import React from "react";

function InsertFormButton(props){
    const handleClicks = () =>{
        props.changeForm();
    }
    const style = {
        fontSize: 20,
        height: "5vw",
        width: "5vw",
        color: "black",
        border:"1px solid black",
        borderRadius: "5%",
        display: 'inline-block',
        margin: 5
        
        
    
            }
return (<button style={style} className="InsertFormButton" onClick={handleClicks}>+</button>)
}
export default InsertFormButton;