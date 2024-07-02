import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


type Props = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: Props) => {
    const [taskTitle, SetTaskTitle] = useState("")
    const [taskInputError, setTaskInputError] = useState<string | null>("")


    const addItemHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            addItem(taskTitle)
        } else {
            setTaskInputError("Title is requied")
        }

        SetTaskTitle("")
    }

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // tasksElement && setTaskInputError(null)
        SetTaskTitle(e.currentTarget.value)
    }

    const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItemHandler()
        }
    }
    const buttonStyles = {
        maxWidth: "30px",
        maxHeight: "30px",
        minWidth: "30px",
        minHeight: "30px"
    }

    return (
        <div>
            {/*<input value={taskTitle}*/}
            {/*       onChange={changeItemTitleHandler}*/}
            {/*       onKeyDown={keyDownAddTaskHandler}*/}
            {/*       className={taskInputError ? "taskInputError" : ""}*/}
            {/*/>*/}
            <TextField error={!!taskInputError}
                       id="outlined-basic" label="Outlined" variant="outlined" value={taskTitle}
                       onChange={changeItemTitleHandler}
                       onKeyDown={keyDownAddTaskHandler}
                       className={taskInputError ? "taskInputError" : ""}/>
            {/*<Button onClickHandler={addItemHandler} title={"+"} disabled={!Boolean(taskTitle.trim())}/>*/}
            <Button onClick={addItemHandler} variant="contained"
                    style={buttonStyles}>+</Button>
            {taskTitle.length > 15 && <div>Много символов</div>}

        </div>
    );
};

