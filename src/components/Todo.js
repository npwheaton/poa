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
                 if(props.singleTodo.completed===true){
                        return "#020020"
                } else if(calcTimeAvailable()>=50){
                        return `linear-gradient(to right, rgba(0, 196, 22, 0.69) ${calcTimeAvailable()}%, rgba(222, 9, 9, 0.69))`
                }
                return `linear-gradient(to right, rgba(0, 196, 22, 0.69)  , rgba(222, 9, 9, 0.69) ${calcTimeAvailable()}%)`
        }

                    
        const seperateDateTimeString=(string, type)=>{
                let fullstring = string.split("|");
                let dt = fullstring[0];
                let timestring = fullstring[1];
                let hr = parseInt(timestring.split(":")[0]);
                let localhr;
                if(type=="time"){
                        if(hr>12){
                         localhr = hr-12;
                        return `${localhr}:${timestring.split(":")[1]} pm`
               
                        } else{
                        return  `${hr}:${timestring.split(":")[1]} am`

                       }
                } else{
                        return dt;

                }

        }
        const style = {
                background: handleBackground(),
                
                } 
              


return (
    <li className="todo" style={style}>
        <div className="seperator">
        <div className="todotextcontainer">
          <span className="todoname" style={{textDecoration: props.singleTodo.completed===true? "line-through solid white 1px":""}}>{props.text}</span>      
        </div>
        <div className="dtcontainer">
        <span className="dateTimeDue"style={{textDecoration: props.singleTodo.completed===true? "line-through solid white 1px":""}}>{seperateDateTimeString(props.dateDue, "date")}</span>
        </div>
        <div className="dtcontainer">
        <span className="dateTimeDue"style={{textDecoration: props.singleTodo.completed===true? "line-through solid white 1px":""}}>{seperateDateTimeString(props.dateDue, "time")}</span>
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
    </li>
       )
}
export default Todo;