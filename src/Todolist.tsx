import React from "react";
import {FilterValuesType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (tasksId: number) => void
    changeFilter: (newFilter: FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


export const Todolist = ({title, tasks, removeTask, changeFilter}: TodolistPropsType) => {

    const tasksElement: Array<JSX.Element> | JSX.Element = tasks.length !== 0 ?


        tasks.map(task => {
            return (
                <li key={task.id}><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                    <Button onClickHandler={() => removeTask(task.id)} title={"x"}/>
                </li>
            )
        }) : <span>нет тасок</span>

    return (

        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={"+"}/>

            </div>
            <ul>
                {tasksElement}
            </ul>
            <div>
                <Button onClickHandler={() => changeFilter("all")} title={"All"}/>
                <Button onClickHandler={() => changeFilter("active")} title={"Active"}/>
                <Button onClickHandler={() => changeFilter("completed")} title={"Completed"}/>
            </div>
        </div>

    );
};
