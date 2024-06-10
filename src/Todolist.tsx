import React, {ChangeEvent, useState, KeyboardEvent, useRef} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (tasksId: string) => void
    changeFilter: (newFilter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter
                         }: TodolistPropsType) => {


    const [taskTitle, SetTaskTitle] = useState("")
    const [taskInputError, setTaskInputError] = useState<string | null>("нет задачи")

    const tasksElement: Array<JSX.Element> | JSX.Element = tasks.length !== 0 ?


        tasks.map(task => {
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}
                           onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}/>
                    <span className={task.isDone ? "task-complete" : "task"}>{task.title}</span>
                    <Button onClickHandler={() => removeTask(task.id)} title={"x"}/>
                </li>
            )
        }) : <span>нет тасок</span>

    const addTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            addTask(taskTitle)
        } else {
            setTaskInputError("Title is requied")
        }

        SetTaskTitle("")
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        tasksElement && setTaskInputError(null)
        SetTaskTitle(e.currentTarget.value)
    }

    const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    return (

        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={keyDownAddTaskHandler}
                       className={taskInputError ? "taskInputError" : ""}

                />
                <Button onClickHandler={addTaskHandler} title={"+"} disabled={!Boolean(taskTitle.trim())}/>
                {taskTitle.length > 15 && <div>Много символов</div>}

            </div>
            <ul>
                {tasksElement}
            </ul>
            <div>
                <Button clas={filter === "all" ? "button-active" : ""} onClickHandler={() => changeFilter("all")}
                        title={"All"}/>
                <Button clas={filter === "active" ? "button-active" : ""} onClickHandler={() => changeFilter("active")}
                        title={"Active"}/>
                <Button clas={filter === "completed" ? "button-active" : ""}
                        onClickHandler={() => changeFilter("completed")} title={"Completed"}/>
            </div>
        </div>

    );
};
