import React from "react";

function Form(props){
    const dateobj = new Date(props.currentMilliSec);
    let minmonth = ((dateobj.getMonth()+1)<10? `0${dateobj.getMonth()+1}`:`${dateobj.getMonth()+1}`);
    let minday = ((dateobj.getDate())<10? `0${dateobj.getDate()}`:`${dateobj.getDate()}`);
    let minfulldate = `${dateobj.getFullYear()}-${minmonth}-${minday}`;
    let minhour = ((dateobj.getHours())<10? `0${dateobj.getHours()}`:`${dateobj.getHours()}`);
    let minminutes = ((dateobj.getMinutes())<10? `0${dateobj.getMinutes()}`:`${dateobj.getMinutes()}`);
    let mintime = `${minhour}:${minminutes}`;
    const parseStringtoDateorTime =(string, type) =>{
        if(type==="time"){
            let arr = string.split(":");
         return parseInt(`${arr[0]}${arr[1]}`)
        }else{
            let arr = string.split("-");
            return parseInt(`${arr[0]}${arr[1]}${arr[2]}`)  
        }
    }
    const check4Dupes = (sample) =>{
        let arr = props.todos.filter((todo)=>{ return todo.text === sample});
        if (arr.length > 0){
            return true;
        }
        return false;
    }

    
    const handleInput = (e) =>{
        props.setInputText(e.target.value);

    }
    const handleDate = (e) =>{
        let inpdate = parseStringtoDateorTime(e.target.value,"date");
        let minimum = parseStringtoDateorTime(minfulldate,"date");
        if(inpdate<minimum){
            props.setAlert(`Error: Incorrect date. The date needs to be set to ${minfulldate} or later`);
        } else{
            props.setInputDate(e.target.value);
        }
        
    }
    const handleTime = (e) =>{
        let inptime = parseStringtoDateorTime(e.target.value,"time");
        let minimum = parseStringtoDateorTime(mintime,"time");
        if(inptime<minimum && props.inputDate===minfulldate){
            props.setAlert(`Error: Incorrect time. The Time for ${minfulldate} needs to be set to ${mintime} or later`);
        }else{  
            props.setInputTime(e.target.value);

        }
    }
    const handleTodos =(e) =>{
        e.preventDefault();
        if(props.inputText!=="" && props.inputDate!=="" && props.inputTime!=="" && check4Dupes(props.inputText)===false){
            const singleTodo = {
                id: `${props.inputText}${Date.now()}`,
                text: props.inputText,
                dateCreated: Date.now(),
                dateDue: `${props.inputDate}|${props.inputTime}`,
                completed: false
              }
              props.setTodos([singleTodo,...props.todos].sort(props.sortbydateDue));
              props.setInputText("");
              props.setInputTime("");
              props.setInputDate("");
              props.changeForm();
        }else if(props.inputText==="" || props.inputDate==="" || props.inputTime===""){
            props.setAlert("Error: One of the boxes are empty");
        }else if(check4Dupes(props.inputText)){
            props.setAlert("Error: There is already a task with that name");
        }
        
    }
    const style = {
        height: 25,
        width: 25,
        color: "black",
        padding: 5,
        border:"1px solid black",
        borderRadius: "5%",
        display: 'inline-block',
        margin: 5
    
            }

    return ( 
    <div>
        <div className="form-cancel" onClick={props.changeForm}/>
        <form>
            <input type="text" value={props.inputText} className="form-text" onChange={handleInput} />
            <input type="date" className="form-date"onInput={handleDate} min={minfulldate} />
            <input type="time" className="form-time"onInput={handleTime}  />
            <button style={style} className="form-button" type="submit" onClick={handleTodos}> 
                <i className="placegolder"></i>
            </button>
        </form>
    </div>
    )
}
export default Form;