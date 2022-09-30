import React from "react";
import './TodosFilterButton.css'

function TodosFilterButton(props){
const filterAll =(e)=>{
    if(props.listFilter!== "all"){
        props.setListFilter(e.target.value);
    }

    
}
const filterCompleted =(e)=>{
    if(props.listFilter!== "completed"){
        props.setListFilter(e.target.value);
    }
    
}
return (
<div className="TodosFilterButton" >
    <input type="radio" name="filter" id="allButton" value="all" style={{display: "none"}} onChange={filterAll}/>
    <label htmlFor="allButton" className={props.listFilter==="all"?"checked button-input":"button-input"}>All</label>
    <input type="radio" name="filter" id="completedButton" value="completed"  style={{display: "none"}} onChange={filterCompleted}/>
    <label htmlFor="completedButton" className={props.listFilter==="completed"?"checked button-input":"button-input"}>Completed</label>
</div>)
}
export default TodosFilterButton;