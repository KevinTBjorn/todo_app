import { UIButton, UIDivider, UIInput, UIList, UIListItem, UIPageHeader } from "@apollo/apollo-ui-reactjs";
import React, { ChangeEvent, useState } from "react";
import { ITask } from './Interface';
import { TodoTask } from "./Component/TodoTask";

export function App() {
  const [ task, setTask ] = useState<string>("");
  const [ indicator, setIndicator]  = useState<number>(0);
  const [ todo, setTodo ] = useState<ITask[]>([]);
  const [ inputCheck, setInputCheck ] = useState<boolean>(false);
  
  const handleChange = (event:ChangeEvent<HTMLInputElement>) =>{
    if(event.target.name === "task"){
      setTask(event.target.value);
    }
  }

  const addTask = () =>{
    if(task.trim().length !== 0 )
    {
      setIndicator(indicator + 1);
      const newTask ={
        taskName:task,
        indicatorNum:indicator,
        check:false
      }
      setTodo([...todo, newTask])
      setTask("");
      setInputCheck(false);
    }
    else
    {
      setTask("");
      setInputCheck(true);
    }
  }

  const completeTask = (taskNumberToDelete:number) =>{
    setTodo(todo.filter((task)=>{
      return task.indicatorNum !== taskNumberToDelete
    }))
  }

  const deleteAllTask = () =>{
    setTodo([]);
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
      <UIButton onClick={addTask} theme="primary">Add</UIButton>
      <UIDivider/>
      <UIList>
        {todo.map((task:ITask, key:number)=>{
          return <TodoTask task={task} key={key} handleToggle={handleToggle} completeTask={completeTask} />
        })}
      </UIList>
      <UIDivider/>
      <UIButton theme="alarm" onClick={deleteAllTask}>Delete all</UIButton>
      </>
    )
  }