import React from "react";

function Todo(props){

        const textstyle = {
                display: "inline-block",
                textAlign: "left",
        }
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
                        return `linear-gradient(to right, green ${calcTimeAvailable()}%, red)`
                }
                return `linear-gradient(to right, green  , red ${calcTimeAvailable()}%)`
        }
        const style = {
                //height: "10%",
                //width: "40%",
                    color: "white",
                    padding: 5,
                     border:"1px solid white",
                    borderRadius: "5%",
                    display: 'inline-block',
                    margin: 5,
                    background: handleBackground()
                    //background: `linear-gradient(to right, green 0% ${calcTimeAvailable()}%, red ${calcTimeAvailable()}% 100%)`
            
                    }        
              


return (
    <li className="todo" style={style}>
        <div style={textstyle}>
        <div className="todoname">
          <span style={{backgroundColor:"#020020", padding: 2}}>{props.text}</span>      
        </div>
        <span className="dateDue"style={{backgroundColor:"#020020", padding: 2}}>{props.dateDue}</span>
        </div>

        <div style={textstyle}>
        <button  onClick={completeHandler}  className="accept-button">
                <i className="placegolder"></i>
        </button>
        <button onClick={deleteHandler} className="delete-button">
                <i className="placegolder"></i>
        </button>
        </div>
    </li>
       )
}
export default Todo;