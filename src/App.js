import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoManager from './components/TodoManager';
import InsertFormButton from './components/InsertFormButton';
import AlertMessage from './components/AlertMessage';

function App() {
  const [alertmsg, setAlertMessage] = useState({message: "",showAlert: false}); 
  const [showForm, setShowForm] = useState(false);  
  const [inputText, setInputText] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [inputPriority, setInputPriority] = useState(2);
  const [todos, setTodos] = useState([]);
  const [currentMilliSec, setcurrentMilliSec] = useState(Date.now());
  const [listFilter, setListFilter] = useState("all");
  useEffect(() => {
    //get saved todos
      if(localStorage.getItem("list")!==null){
        let newlist = JSON.parse(localStorage.getItem("list"));
        setTodos(newlist);
      }
      

    const myInterval = setInterval(()=>{setcurrentMilliSec(Date.now())},60000);



    return () => clearInterval(myInterval);
  }, []);
  
  useEffect(() => {
    //save todos
    localStorage.setItem("list", JSON.stringify(todos));
  }, [todos]);


  
  const changeForm=()=>{
    let form = !showForm;
    setShowForm(form);
  }
  const setAlert=(msg)=>{
    setAlertMessage({message: msg, showAlert: true})
  }
  const calcTillDateDue=(singleTodo)=>{
    let dtString = singleTodo.dateDue.split('|');
    let ndate = new Date(`${dtString[0]}T${dtString[1]}:00`);
    let milldue = ndate.getTime();
    if(singleTodo.completed===true){
      return  currentMilliSec *2;
    }
    return milldue - currentMilliSec;
  }
  const sortbydateDue=(a,b)=>{
    if(a.priority>b.priority ){
      if(a.completed===false &&b.completed===false){
        return -1;
      }else if( a.completed===true &&b.completed===false){
        return  1;
      }else if( a.completed===false &&b.completed===true){
        return -1;
      }else if( a.completed===true &&b.completed===true){
        return  -1;
      }
      
    }else if(a.priority<b.priority ){
      if(a.completed===false &&b.completed===false){
        return 1;
      }else if( a.completed===true &&b.completed===false){
        return  1;
      }else if( a.completed===false &&b.completed===true){
        return -1;
      }else if( a.completed===true &&b.completed===true){
        return  1;
      }
    }else if(a.priority===b.priority){
      if(calcTillDateDue(a) > calcTillDateDue(b)){
        return 1;
      } else if(calcTillDateDue(a) < calcTillDateDue(b)){
        return -1;
      }else{
        return 0;
      }
    }

  return 0;
  }






  
  return (
    <div className="App">
        <div className='header'>Action Board</div>
        {alertmsg.showAlert&& <AlertMessage setAlertMessage={setAlertMessage} message={alertmsg.message}/>}
        <InsertFormButton  changeForm={changeForm}/>
          {showForm?          <Form 
          setInputText={setInputText}
          setInputDate={setInputDate}
          setInputTime={setInputTime} 
          setTodos={setTodos}
          inputText={inputText}
          inputDate={inputDate}
          inputTime={inputTime}
          todos={todos}
          currentMilliSec={currentMilliSec}
          changeForm={changeForm}
          setAlert={setAlert}
          showAlert={alertmsg.showAlert}
          sortbydateDue={sortbydateDue}
          setInputPriority={setInputPriority}
          inputPriority={inputPriority}

          
        /> :""

        }
        
        <TodoManager
        listFilter={listFilter}
        todos={todos}
        currentMilliSec={currentMilliSec}
        setAlert={setAlert}
        setTodos={setTodos}
        setListFilter={setListFilter}
        sortbydateDue={sortbydateDue}
        setInputPriority={setInputPriority}
        inputPriority={inputPriority}
        />
    </div>
  );
}

export default App;
