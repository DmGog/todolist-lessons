import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [todolistId: string]: TaskType[]
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>(
        [{
            id: todolistId1,
            title: "Что купить",
            filter: "all"
        }, {
            id: todolistId2,
            title: "Что выбросить",
            filter: "all",
        }
        ])

    const [tasks, setTasks] = useState<TaskStateType>(
        {
            [todolistId1]: [
                {id: v1(), title: "css", isDone: false},
                {id: v1(), title: "css", isDone: false},
                {id: v1(), title: "css", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "react", isDone: false},
                {id: v1(), title: "react", isDone: false},
                {id: v1(), title: "react", isDone: false},
            ],
        })

    const changeFilter = (newFilter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id == todolistId ? {...tl, filter: newFilter} : tl))
    }

    const removeTask = (tasksId: string, todolistId: string) => {
        // const updatedTasks = tasks[todolistId]
        // const filteredTasks = updatedTasks.filter(e => e.id !== tasksId)
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = filteredTasks
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== tasksId)})
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
//1 способ изменения статуса :  изъян вмешиваемся в объект тасок
    /* const changeTaskStatus = (taskId: string) => {
         const task: TaskType | undefined = tasks.find(t => t.id === taskId)
         if (task) {
             task.isDone = !task.isDone
             setTasks([...tasks])
         }
     }*/
    // 2 способ
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }


    const todoListElement = todolists.map(tl => {

        let tasksForTodolist = tasks[tl.id];
        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
        }

        return (
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                filter={tl.filter}

                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
            />

        )
    })
    return (
        <div className="App">
            {todoListElement}
        </div>
    );
}

export default App;
