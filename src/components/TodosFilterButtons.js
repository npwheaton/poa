import React from "react";

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
    <label htmlFor="allButton" className={props.listFilter==="all"?"checked":"unchecked"}>All</label>
    <input type="radio" name="filter" id="completedButton" value="completed"  style={{display: "none"}} onChange={filterCompleted}/>
    <label htmlFor="completedButton" className={props.listFilter==="completed"?"checked":"unchecked"}>Completed</label>
</div>)
}
export default TodosFilterButton;