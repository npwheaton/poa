import React from "react";
import Todo from "./Todo";
import TodosFilterButton from "./TodosFilterButtons";

function TodoManager(props){
    const style = {
        //height: "10%",
        //width: "40%",
            padding: 5,
            display: 'flex',
            margin: 5,
            flexWrap: 'wrap'
    
            }
return (
    <div className="TodoContainer">
        <TodosFilterButton listFilter={props.listFilter} setListFilter={props.setListFilter}/>
        <ul style={style}>
            {props.listFilter==='all'? props.todos.map((todo)=>{
                return(
                    <Todo 
                    key={todo.id} 
                    text={todo.text}
                    currentMilliSec={props.currentMilliSec}
                    singleTodo={todo}
                    dateDue={todo.dateDue}
                    setTodos={props.setTodos}
                    todos={props.todos}
                    sortbydateDue={props.sortbydateDue}
                    
                    />
                )
            }):props.todos.map((todo)=>{
                if(todo.completed===true){
                    return(
                        <Todo 
                        key={todo.id} 
                        text={todo.text}
                        currentMilliSec={props.currentMilliSec}
                        singleTodo={todo}
                        dateDue={todo.dateDue}
                        setTodos={props.setTodos}
                        todos={props.todos}
                        sortbydateDue={props.sortbydateDue}
                        
                        />
                    )
                } return null

            })
}           
        </ul>

    </div>
       )
}
export default TodoManager;