import { UIButton, UIDivider, UIInput, UIList, UIListItem, UIPageHeader } from "@apollo/apollo-ui-reactjs";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ITask } from './Interface';
import { TodoTask } from "./Component/TodoTask";
import { title } from "process";

export function App() {
  const [ task, setTask ] = useState<string>("");
  const [ todo, setTodo ] = useState<ITask[]>([]);
  const [ inputCheck, setInputCheck ] = useState<boolean>(false);
  
  const handleChange = (event:ChangeEvent<HTMLInputElement>) =>{
    if(event.target.name === "task"){
      setTask(event.target.value);
    }
  }

  const apiURL = () => {
    let url;
    if(process.env.URL != undefined)
    {
      url = process.env.apiURL;
    }
    else
    {
      url = 'https://kbj-todo-backend.azurewebsites.net/api/TodoTasks';
    }
    return url;
  }

  const taskTemplate = (data) => {
    const task = {
      taskName:data.title,
      indicatorNum:data.id,
      check:false
    }
    return task;
  }
  
  useEffect(() => {
    updateTodoList()
  }, []);

  const updateTodoList = () => {
    fetch(apiURL())
    .then(reponse => reponse.json() )
    .then(data => {
      setTodo([]);
      const array: ITask[] = []
      for(var i = 0; i < data.length; i++){
        const newTask = taskTemplate(data[i])
        array.push(newTask)
      }
      setTodo(array)
    })
    .catch(err => {
      console.log(err.message)
    });
  }

  const postTask = () => {
    if(task.trim().length !== 0 )
    {
      fetch(apiURL(), {
        method: "post",
        body: JSON.stringify({
          title: task,
        }),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      })
      .then(reponse => reponse.json())
      .then(data => {
        const newTask = taskTemplate(data)
        setTodo([...todo, newTask])
        setTask("");
        setInputCheck(false);
      })
      .catch(err => {
        console.log(err.message);
     });
    }
    else
    {
      setTask("");
      setInputCheck(true);
    }
    
  }

  const completeTaskDelete = (taskNumberToDelete:number) => {
    fetch(`${apiURL()}/${taskNumberToDelete}`, {
      method: "delete"
    })
    .then(reponse => updateTodoList())
    .catch(err => {
      console.log(err.message);
   });
  }

  const deleteAllTask = () =>{
    fetch(`${apiURL()}/deleteAll`, {
      method: "delete"
    })
    .then(reponse => updateTodoList())
    .catch(err => {
      console.log(err.message);
   });
  }

  const handleToggle = (value:number) => {
    const currentIndex = todo.findIndex(e => e.indicatorNum === value);
    const newChecked = [...todo];

    if (todo[currentIndex].check === false) {
      todo[currentIndex].check = true;
    } else {
      todo[currentIndex].check = false;
    }

    setTodo(newChecked);
  };
    return (
      <>
      <UIPageHeader title="Todo app"/>
      <UIInput
         onChange={ (event) => handleChange(event)}
         label="Description"
         name="task"
         placeholder="Add a task"
         value={ task }
         error={inputCheck}
         required
         width={1000}
         />
      <UIButton onClick={postTask} theme="primary">Add</UIButton>
      <UIDivider/>
      <UIList>
        {todo.map((task:ITask, key:number)=>{
          return <TodoTask task={task} key={key} handleToggle={handleToggle} completeTask={completeTaskDelete} />
        })}
      </UIList>
      <UIDivider/>
      <UIButton theme="alarm" onClick={deleteAllTask}>Delete all</UIButton>
      </>
    )
  }