import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import './Todo.css';

function Todo(props){


        const deleteHandler =()=>{
                props.setTodos(props.todos.filter((td)=>{return td !== props.singleTodo}));

        }
        const completeHandler =()=>{
                props.setTodos(props.todos.map((td)=>{
                        if(td === props.singleTodo && td.completed=== false){
                         td.completed = true;
                       }
                       return td;
                }).sort(props.sortbydateDue));

        }
        const calcTimeAvailable=()=>{
                let dtString = props.singleTodo.dateDue.split('|');
                let ndate = new Date(`${dtString[0]}T${dtString[1]}:00`);
                let milldue = ndate.getTime();
                let timeAlotted = milldue - props.singleTodo.dateCreated;
                let timeSpent = props.currentMilliSec - props.singleTodo.dateCreated;
                if(props.singleTodo.completed===true){
                  return 100;
                } else if(timeAlotted<=0){
                  return 0;
                } else if(((1-(timeSpent/timeAlotted)) * 100)<0){
                 return 0;
                }
                let ans = (1-(timeSpent/timeAlotted)) * 100;
                return ans.toFixed(2);
              }
        
        const handleBackground=()=>{
                 if(props.singleTodo.completed===false){
                        return "#f3f3f3"
                } else{
                        return ` url(/images/grey&whitecheckered2.jpg)`
                }
                
        }
        const handleprogressbar=()=>{
                const availtime = calcTimeAvailable();
                if(props.singleTodo.completed===true){
                        return "0%";
                } else if(availtime<=0){
                        return "0%";
                }else if(availtime>100){
                        return "100%";
                }else{
                        return `${availtime}%`;
                }
                    
        }

                    
        const seperateDateTimeString=(string, type)=>{
                let fullstring = string.split("|");
                let dt = fullstring[0];
                let timestring = fullstring[1];
                let hr = parseInt(timestring.split(":")[0]);
                let localhr;
                if(type==="time"){
                        if(hr>12){
                         localhr = hr-12;
                        return `${localhr}:${timestring.split(":")[1]} pm`
               
                        } else{
                                if(hr===0){
                                 return  `12:${timestring.split(":")[1]} am`
                                }
                        return  `${hr}:${timestring.split(":")[1]} am`

                       }
                } else{
                        return dt;

                }

        }
        const deciferPriority=()=>{
                if(props.singleTodo.completed===true){
                        return "completepriority";
                }else if(props.singleTodo.priority===3){
                        return "Urgent";
                }else if(props.singleTodo.priority===2){
                        return "Normal";
                }else if(props.singleTodo.priority===1){
                        return "Optional";
                }
                return "completepriority";
        }


        const shakeanimation=()=>{
                const priority = deciferPriority();
                if(priority==="completepriority" || priority==="Optional"){
                        return "";
                }else{
                        const availtime = calcTimeAvailable();
                        if(availtime>0 && availtime<=20){
                                return "shake";
                        }else{
                                return "";
                        }
                        
                }
        }

        const dueToday=()=>{
                let dtString = props.singleTodo.dateDue.split('|');
                let ddate = new Date(`${dtString[0]}T${dtString[1]}:00`);
                let cdate = new Date(props.currentMilliSec);
                let currdate = `${cdate.getFullYear()}${cdate.getMonth()+1}${cdate.getDate()}`;
                let duedate = `${ddate.getFullYear()}${ddate.getMonth()+1}${ddate.getDate()}`;
                if(duedate===currdate){
                        return true;
                }else{
                        return false;
                }
        }
        const overdue=()=>{
               let availtime = calcTimeAvailable();
               if(availtime<=0){
                return true;
               }else{
                return false;
               }
        }
        const backgroundbarstyle = {
                backgroundImage: handleBackground(),
                
                } 
        const progressbarstyle= {
                width: handleprogressbar()
        }
        


return (
    <li className="todo" >
        <div className='todocontent'>
        <div className="seperator">
        <div className={`todotextcontainer ${props.singleTodo.completed===true?'white':'text-fill'}`}>
          <span className={`todoname ${props.singleTodo.completed===true?'line-thru':''}`} >{props.text}</span>      
        </div>
        <div className='dtcontainer'>
        <span className={`dateTimeDue ${props.singleTodo.completed===true?'line-thru':overdue()?'duetoday':dueToday()?'duetoday':''} ${shakeanimation()}`}>{props.singleTodo.completed===true?seperateDateTimeString(props.dateDue, "date"):overdue()?'Overdue':dueToday()?'Due Today':seperateDateTimeString(props.dateDue, "date")}</span>
        </div>
        <div className="dtcontainer">
        <span className={`dateTimeDue ${props.singleTodo.completed===true?'line-thru':''}`}>{seperateDateTimeString(props.dateDue, "time")}</span>
        </div>
        <div className="dtcontainer">
        <span className={`dateTimeDue ${deciferPriority()}`}>!
        <span className='tooltip'>{deciferPriority()==="completepriority"?"No priority":deciferPriority()}</span>
        </span>
        
        </div>

        </div>

        <div className="buttoncontainer">
        <button  onClick={completeHandler}  className="button accept-button">
                <FontAwesomeIcon icon={faCheck} />
        </button>
        <button onClick={deleteHandler} className="button delete-button">
                <FontAwesomeIcon icon={faXmark} />
        </button>
        </div>
        </div>
        <div className='backgroundbar' style={backgroundbarstyle}>
                <div className='progressbar' style={progressbarstyle}></div>
        </div>

    </li>
       )
}
export default Todo;