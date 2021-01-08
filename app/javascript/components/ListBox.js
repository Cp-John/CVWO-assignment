import React, { useState, useEffect } from "react"
import axios from 'axios'
import ListItemTask from './ListItemTask'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';

// props:
// optional: isSearchBox, selectedTags, showAll

const ListBox = (props) => {
    const [tasks, setTasks] = useState([])
    const [tags, setTags] = useState([])

    const isSearchBox = props.isSearchBox
    let selectedTags = props.selectedTags
    let showAll = props.showAll


    // fetch data
    useEffect(() => {
        axios.get('/api/tasks').then(resp => {
            setTags(resp.data.included)
            setTasks(resp.data.data)
        }).catch(resp => {
            console.log(resp)
        })
    }, [])

    const handleDelete = (id) => () => {
        axios.delete(`/api/tasks/${id}`).then(resp => {
            setTasks(tasks.filter(task => task.id != id))
        }).catch(resp => {
            console.log(resp)
        })
    }

    const handleAddTask = () => {
        window.location.href = "/task/new"
    }

    const filteredTasks = (searchKey) => {
        let tasksShown = showAll ? tasks : tasks.filter(task => task.attributes.status != "completed")
        if (searchKey) {
            return tasksShown.filter(task => {
                let upperCaseTitle = task.attributes.title.toUpperCase()
                let upperCaseDescription = task.attributes.description.toUpperCase()
                let upperCaseSearchKey = searchKey.toUpperCase()

                return upperCaseTitle.includes(upperCaseSearchKey) ||
                    upperCaseDescription.includes(upperCaseSearchKey)
            })
        } else {
            return tasksShown
        }
    }

    let tasksShown = filteredTasks(props.searchKey)

    if (!isSearchBox && selectedTags.length > 0) {
        selectedTags.forEach(tagId => {
            tasksShown = tasksShown.filter(task => {
                return parseInt(task.relationships.category.data.id) == tagId
            })
        });
    }

    return (
        <List component="nav" dense={isSearchBox}>
            <ListItem style={{display: isSearchBox ? "none" : "block", textAlign: "center"}} button onClick={handleAddTask} >
                <AddIcon />
            </ListItem>
            {
                tasksShown.map(task => {
                    const tag = tags.find(tag => tag.id == task.relationships.category.data.id)
                    return (
                        <ListItemTask key={task.attributes.id}
                            task={task} tag={tag} isSearchBox={isSearchBox}
                            handleDelete={handleDelete} />
                    )
                })
            }
        </List>
    );
}

export default ListBox