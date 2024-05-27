import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"


function App() {

    const todoListTitle = "Сделать"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "html", isDone: true},
        {id: 2, title: "css", isDone: true},
        {id: 3, title: "react", isDone: false},
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

    const removeTask = (tasksId: number) => {
        setTasks(tasks.filter(t =>
            t.id !== tasksId
        ))
    }

    return (
        <div className="App">
            <Todolist title={todoListTitle} tasks={filterTasksForTodolist} removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
