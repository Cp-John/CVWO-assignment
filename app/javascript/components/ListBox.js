import React from "react"
import TaskListItem from './TaskListItem'
import { handleAddTask } from './public/data'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';

const ListBox = (props) => {
    let tasksShown = props.tasksShown
    let tags = props.tags
    const handleDeleteTask = props.handleDeleteTask
    const handleDoneTask = props.handleDoneTask

    return (
        <List component="nav" >
            <ListItem style={{display: "block", textAlign: "center"}} button onClick={handleAddTask} >
                <AddIcon />
            </ListItem>
            {
                tasksShown.map(task => {
                    const tag = tags.find(tag => tag.id == task.relationships.category.data.id)
                    return (
                        <TaskListItem key={task.attributes.id}
                            task={task} tag={tag}
                            handleDeleteTask={handleDeleteTask}
                            handleDoneTask={handleDoneTask} />
                    )
                })
            }
        </List>
    );
}

export default ListBox