import React, { useState } from "react"
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    textField: {
        margin: "20px auto",
        width: 200,
    },
    btnContainer: {
        margin: "20px auto",
    },
    btn: {
        margin: "0 20px",
    },
    card: {
        width: "100%",
        textAlign: "center",
    },
    textarea: {
        fontSize: "13px",
        letterSpacing: "1px",
        lineHeight: "1.5",
        boxShadow: "1px 1px 1px #999",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        margin: "auto",
    },
}));

const NewTaskInfo = (props) => {
    const classes = useStyles()
    const task = props.task
    const priority = task.priority ? task.priority : "medium"
    const due_date = task.due_date ? task.due_date : ""
    const title = task.title ? task.title : "untitled"
    const description = task.description ? task.description : ""
    const [newTask, setNewTask] = useState(
        {
            priority: priority,
            title: title,
            due_date: due_date,
            description: description
        }
    )

    const requestType = props.requestType

    const handleSubmit = () => {
        if (requestType == "post") {
            axios.post('/api/tasks', { task: newTask }).then(resp => {
                const id = resp.data.data.id
                window.location.href =  `/tasks/${id}`
            }).catch(resp => console.log(resp))
        } else {
            const id = task.id
            axios.put(`/api/tasks/${id}`, { task: newTask }).then(resp => {
                window.location.href =  `/tasks/${id}`
            }).catch(resp => console.log(resp))
        }
    }

    const handlePriorityChange = (e) => {
        const priority = e.target.value
        setNewTask(
            Object.assign({}, newTask, { priority: priority }))
    }

    const handleDateChange = (e) => {
        const due_date = e.target.value
        setNewTask(
            Object.assign({}, newTask, { due_date: due_date }))
    }

    const handleDescriptionChange = (e) => {
        const description = e.target.value
        setNewTask(
            Object.assign({}, newTask, { description: description }))
    }

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <h3>Title: {newTask.title}</h3>
                <form>
                    <TextareaAutosize
                        rowsMax={5}
                        rows={"5"}
                        cols={"60"}
                        className={classes.textarea}
                        value={newTask.description}
                        aria-label="maximum height"
                        placeholder="Description here ..."
                        onChange={handleDescriptionChange}
                    />

                    <br />

                    <TextField
                        id="due_date"
                        label="Due date"
                        type="date"
                        value={newTask.due_date}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleDateChange}
                    />

                    <br />

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Priority</InputLabel>
                        <Select
                            value={newTask.priority}
                            onChange={handlePriorityChange}
                        >
                            <MenuItem value={"medium"}>medium</MenuItem>
                            <MenuItem value={"high"}>high</MenuItem>
                            <MenuItem value={"low"}>low</MenuItem>
                        </Select>
                    </FormControl>

                    <br />

                    <div className={classes.btnContainer}>
                        <Button variant="contained" color="secondary" onClick={props.handleCancel} className={classes.btn}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.btn}>
                            Submit
                        </Button>
                    </div>
                </form>
            </Card>
        </React.Fragment>
    );
}

export default NewTaskInfo
