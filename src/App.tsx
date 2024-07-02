import React, {useState} from "react";
import "./App.css";
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import {Container, createTheme, CssBaseline, Grid, Paper, ThemeProvider} from "@mui/material";

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
            title: "Что изучил",
            filter: "all"
        }, {
            id: todolistId2,
            title: "Что выучить",
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


    const updateTask = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title} : el)})
    }

    const updateTodolist = (todolistId: string, title: string) => {
        const newTitle = todolists.map(el => el.id === todolistId ? {...el, title} : el)
        setTodolists(newTitle)
    }

    const changeFilter = (newFilter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id == todolistId ? {...tl, filter: newFilter} : tl))
    }

    const removeTask = (tasksId: string, todolistId: string) => {
        // const updatedTasks = tasks[todolistId]
        // const filteredTasks = updatedTasks.filter(e => e.id !== tasksId)
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = filteredTasks
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(tl => tl.id !== tasksId)})
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        const copyTasks = {...tasks}
        delete copyTasks[todolistId]
        setTasks(copyTasks)
    }

    const addTodolist = (title: string) => {
        const newId = v1()
        const newTodo: TodolistType = {
            id: newId,
            title,
            filter: "all"
        }
        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [newId]: []})
    }


    const todoListElement = todolists.map(tl => {

        let tasksForTodolist = tasks[tl.id];
        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
        }

        return (<Grid item key={tl.id}>
                <Paper elevation={6} sx={{p: "30px"}}>
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
                        updateTask={updateTask}
                        updateTodolist={updateTodolist}
                    />
                </Paper>
            </Grid>

        )
    })

    type ThemeMode = "dark" | "light"
    const [themeMode, setThemeMode] = useState<ThemeMode>("light")

    const theme = createTheme({
        palette: {
            mode: themeMode === "light" ? "light" : "dark",
            primary: {
                main: "#83cee8",
            },
        },
    })

    const changeModeHandler = () => {
        setThemeMode(themeMode == "light" ? "dark" : "light")
    }

    return (
        <div className={"App"}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container fixed>
                    <ButtonAppBar callBack={changeModeHandler}/>
                    <Grid container sx={{mb: "30px"}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todoListElement}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;