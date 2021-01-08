import React, { useState } from "react"
import axios from 'axios'

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
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// props:
// necessary: task, tag, handleDelete
// optional: isSearchBox
const ListItemTask = (props) => {
    const [open, setOpen] = useState(false)
    const [task, setTask] = useState(props.task)

    const tag = props.tag
    const isSearchBox = props.isSearchBox

    const id = task.attributes.id

    const goTaskInfo = () => {
        window.location.href = `/taskinfo/${id}`
    }

    const handleView = () => {
        window.location.href = `/taskinfo/${id}`
    }

    const handleEdit = () => {
        window.location.href = `/task/edit/${id}`
    }

    const handleDone = () => {
        axios.patch(`/api/tasks/${id}`, { status: "completed" }).then(resp => {
            setTask(resp.data.data)
        }).catch(resp => {
            console.log(resp)
        })
    }

    const StatusIcon = () => {
        if (task.attributes.status == "completed") {
            return <DoneIcon color="primary" />
        } else {
            return <HourglassFullIcon />
        }
    }

    return (
        <span>
            <Divider />

            <ListItem button onClick={isSearchBox ? goTaskInfo : () => setOpen(!open)} >
                <ListItemIcon>
                    <StatusIcon />
                </ListItemIcon>
                <ListItemText primary={task.attributes.title} secondary={task.attributes.description} />
                <ListItemAvatar>
                    <Chip
                        label={tag.attributes.title}
                        variant="outlined"
                    />
                </ListItemAvatar>
            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Tooltip title="view">
                    <IconButton color="primary" onClick={handleView}>
                        <SearchIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="delete">
                    <IconButton color="secondary" onClick={props.handleDelete(id)}>
                        <DeleteForeverIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="edit">
                    <span>
                        <IconButton color="primary" onClick={handleEdit} disabled={task.attributes.status == "completed"}>
                            <EditIcon />
                        </IconButton>
                    </span>
                </Tooltip>

                <Tooltip title="done">
                    <span>
                        <IconButton color="primary" onClick={handleDone} disabled={task.attributes.status == "completed"}>
                            <DoneIcon />
                        </IconButton>
                    </span>
                </Tooltip>

            </Collapse>
        </span>
    )
}

export default ListItemTask