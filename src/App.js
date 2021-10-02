import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './Components/TodoList';

function App() {
  const [todoList,setToDoList] = useState([]);
  

  useEffect(() => {
    if(localStorage.getItem('list')){
      setToDoList(JSON.parse(localStorage.getItem('list')))
    }
  },[])
 
  useEffect (() => {
    localStorage.setItem('list',JSON.stringify(todoList));
  },[todoList]);
 
  const handleAddList = (todo) => {
    const newTodoList = [...todoList];
    newTodoList.push({
      id:  uuidv4(),
      ...todo
    })
    setToDoList(newTodoList);
  }


  const handleDelete = (index) => {
    const newTodoList = [...todoList]
    newTodoList.splice(index,1);
    setToDoList(newTodoList);
 
  }

  const handleUpdate = (id,data) => {
      const index = todoList.findIndex((todo) => todo.id.indexOf(id) !== -1);

      todoList[index] = {
        ...data
      }

      const newTodoList = [...todoList];
      setToDoList(newTodoList);
  }
  

  return (
      <div >
        <TodoList listTodo={todoList} handleDelete={(index) => handleDelete(index) } onHandleUpdate={(id,data) => handleUpdate(id,data)} onHandleSubmit={(todo)=>handleAddList(todo)}/>
      </div>
  );
}

export default App;
