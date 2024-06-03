import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"


function App() {

    const todoListTitle = "Сделать"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "html", isDone: true},
        {id: v1(), title: "css", isDone: true},
        {id: v1(), title: "react", isDone: false},
    ])

    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

    let filterTasksForTodolist: Array<TaskType> = tasks;
    if (filter === "active") {
        filterTasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        filterTasksForTodolist = tasks.filter(t => t.isDone === true)
    }

    const changeFilter = (newFilter: FilterValuesType) => {
        setFilter(newFilter)
    }

    const removeTask = (tasksId: string) => {
        setTasks(tasks.filter(t =>
            t.id !== tasksId
        ))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        const copyState = [...tasks]
        copyState.push(newTask)
        setTasks(copyState)
    }

    return (
        <div className="App">
            <Todolist title={todoListTitle} tasks={filterTasksForTodolist} removeTask={removeTask}
                      changeFilter={changeFilter} addTask={addTask}/>
        </div>
    );
}

export default App;
