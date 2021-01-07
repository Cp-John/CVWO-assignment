import React, { useState, useEffect } from "react"
import axios from 'axios'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';

const ListBox = (props) => {
    const [tasks, setTasks] = useState([])
    const [tags, setTags] = useState([])

    // fetch data
    useEffect(() => {
        axios.get('/api/tasks').then(resp => {
            setTags(resp.data.included)
            setTasks(resp.data.data)
        }).catch(resp => {
            console.log(resp)
        })
    }, [])

    const goTaskInfo = (id) => {
        window.location.href = `/taskinfo/${id}`
    } 

    const filteredTasks = (searchKey) => {
        if (searchKey) {
            return tasks.filter(task => {
                let upperCaseTitle = task.attributes.title.toUpperCase()
                let upperCaseDescription = task.attributes.description.toUpperCase()
                let upperCaseSearchKey = searchKey.toUpperCase()

                return upperCaseTitle.includes(upperCaseSearchKey) ||
                    upperCaseDescription.includes(upperCaseSearchKey)
            })
        } else {
            return tasks
        }
    }

    let tasksShown = filteredTasks(props.searchKey)

    return (
        <List component="nav">
            {
                tasksShown.map(task => {
                    const tag = tags.find(tag => tag.id == task.relationships.category.data.id)
                    const avatar = tag.attributes.title.charAt(0).toUpperCase()
                    const StatusIcon = () => {
                        if (task.attributes.status == "completed") {
                            return <DoneIcon color="primary" />
                        } else {
                            return <HourglassFullIcon />
                        }
                    }

                    return (
                        <ListItem button key={task.attributes.id} onClick={() => goTaskInfo(task.attributes.id)}>
                            <ListItemIcon>
                                <StatusIcon />
                            </ListItemIcon>
                            <ListItemText primary={task.attributes.title} />
                            <ListItemAvatar>
                                <Chip
                                    label={tag.attributes.title}
                                    avatar={<Avatar>{avatar}</Avatar>}
                                    variant="outlined"
                                />
                            </ListItemAvatar>
                        </ListItem>
                    )
                })
            }
        </List>
    );
}

export default ListBox