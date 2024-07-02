import {FilterValuesType} from "./App";
// import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";

type TodolistPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
    removeTask: (tasksId: string, todolistId: string) => void
    changeFilter: (newFilter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolist: (todolistId: string, newTitle: string) => void
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
                             filter,
                             removeTodolist,
                             todolistId,
                             updateTask,
                             updateTodolist
                         }: TodolistPropsType) => {

    const addTaskHandler = (title: string) => {
        addTask(title, todolistId)
    }

    const updateTaskHandler = (idTask: string, newTitle: string) => {
        updateTask(todolistId, idTask, newTitle)
    }


    const tasksElement: Array<JSX.Element> | JSX.Element = tasks.length !== 0 ?

        tasks.map(task => {
            // const updateTaskHandler = (newTitle: string) => {
            //     updateTask(todolistId, task.id, newTitle)
            // }
            return (
                <ListItem key={task.id}
                          sx={getListItemSx(task.isDone)}
                >
                    <div>
                        <Checkbox checked={task.isDone}
                                  onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)}/>
                        <EditableSpan className={task.isDone ? "task-complete" : "task"} oldTitle={task.title}
                                      updateItem={(newTitle) => updateTaskHandler(task.id, newTitle)}/></div>
                    {/*<Button onClickHandler={() => removeTask(task.id, todolistId)} title={"x"}/>*/}
                    <IconButton aria-label="delete" size="small" onClick={() => removeTask(task.id, todolistId)}>
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                </ListItem>
            )
        }) : <span>нет тасок</span>

    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolistId, title)
    }


    return (
        <div className="todolist">
            <Button variant="contained"
                    onClick={() => removeTodolist(todolistId)}>DelTodo</Button>
            <h3><EditableSpan oldTitle={title} className={""} updateItem={updateTodolistHandler}/></h3>
            <AddItemForm addItem={addTaskHandler}/>
            <List>
                {tasksElement}
            </List>
            <Box sx={filterButtonsContainerSx}>

                <Button size={"small"} variant={filter === "all" ? "contained" : "outlined"}
                        onClick={() => changeFilter("all", todolistId)}>All</Button>
                <Button size={"small"} variant={filter === "active" ? "contained" : "outlined"}
                        onClick={() => changeFilter("active", todolistId)}>Active</Button>
                <Button size={"small"} variant={filter === "completed" ? "contained" : "outlined"}
                        onClick={() => changeFilter("completed", todolistId)}>Completed</Button>

            </Box>
        </div>

    );
};
