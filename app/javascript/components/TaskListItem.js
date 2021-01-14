import React, { useState } from "react"
import { getColor, handleEditTask, handleViewTask } from "./public/data"

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    listItem: {
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
    },
    container: {
        margin: "5px auto",

    }
}))

// props:
// necessary: task, tag, handleDeleteTask, handleDoneTask

const TaskListItem = (props) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const tag = props.tag
    const task = props.task

    const id = task.attributes.id

    const handleDoneTask = props.handleDoneTask

    const StatusIcon = () => {
        if (task.attributes.status == "completed") {
            return <DoneIcon color="primary" />
        } else {
            return <HourglassFullIcon color="primary" />
        }
    }

    const color = getColor(id)

    return (
        <div className={classes.container}>
            <ListItem className={classes.listItem} style={{ backgroundColor: color }} button onClick={() => setOpen(!open)} >
                <ListItemIcon>
                    <StatusIcon />
                </ListItemIcon>
                <ListItemText primary={task.attributes.title} secondary={task.attributes.description} />
                <ListItemAvatar>
                    <Chip
                        label={tag.attributes.title}
                        variant="outlined"
                        style={{ backgroundColor: "whitesmoke" }}
                    />
                </ListItemAvatar>
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit style={{ backgroundColor: "#bdbdbd" }}>
                <Tooltip title="view">
                    <IconButton color="primary" onClick={handleViewTask(id)}>
                        <SearchIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="delete">
                    <IconButton color="secondary" onClick={props.handleDeleteTask(id)}>
                        <DeleteForeverIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="edit">
                    <span>
                        <IconButton color="primary" onClick={handleEditTask(id)} disabled={task.attributes.status == "completed"}>
                            <EditIcon />
                        </IconButton>
                    </span>
                </Tooltip>

                <Tooltip title="done">
                    <span>
                        <IconButton color="primary" onClick={handleDoneTask(id)} disabled={task.attributes.status == "completed"}>
                            <DoneIcon />
                        </IconButton>
                    </span>
                </Tooltip>

            </Collapse>

        </div>
    )
}

export default TaskListItem