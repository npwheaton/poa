import React from "react";
import Todo from "./Todo";
import TodosFilterButton from "./TodosFilterButtons";
import './TodoManager.css'

function TodoManager(props){

return (
    <div className="TodoManager">
        <TodosFilterButton listFilter={props.listFilter} setListFilter={props.setListFilter}/>
        <div className="TodoContainer">
        <ul className="todolist">
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


    </div>
       )
}
export default TodoManager;