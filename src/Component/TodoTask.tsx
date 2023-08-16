import React from "react";
import { ITask } from "../Interface";
import { UIButton, UICheckbox, UIList, UIListItem, UIListItemCell } from '@apollo/apollo-ui-reactjs';


interface Props{
    task:ITask;
    completeTask(taskNameToDelete:number):void;
    handleToggle(value:number):void;
}

export const TodoTask = ({task, completeTask, handleToggle}:Props) =>{
    return (
        <UIListItem >
            {/* <UICheckbox value={}/> */}
            <UIListItemCell key={task.indicatorNum} title={task.taskName}/>
            <UIButton icon="trash" onClick={()=>{completeTask(task.indicatorNum)}}/>
        </UIListItem>
    )
}