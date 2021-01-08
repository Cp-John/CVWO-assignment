import React, { useState, useEffect } from "react"
import axios from 'axios'
import Task from './Task'

import Grid from '@material-ui/core/Grid';

const TaskList = (props) => {
  const [tasks, setTasks] = useState([])
  const [tags, setTags] = useState([])
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

  const handleDone = (id) => () => {
    const task = tasks.find(task => task.attributes.id == id)
    if (task.attributes.status != "completed") {
      axios.put(`/api/tasks/${id}`, { task: { status: 'completed' } }).then(resp => {
        setTasks(tasks.map(task => task.id == id ? resp.data.data : task))
      }).catch(resp => {
        console.log(resp)
      })
    }
  }

  let tasksShown = showAll ? tasks : tasks.filter(task => task.attributes.status != "completed")

  if (selectedTags.length > 0) {
    selectedTags.forEach(tagId => {
      console.log(tagId)
      tasksShown = tasksShown.filter(task => {
        return parseInt(task.relationships.category.data.id) == tagId
      })
    });
  } 

  return (
    <React.Fragment>
      <Grid container spacing={5}>
        {
          tasksShown.map(task => {
            const tag = tags.find(tag => tag.id == task.relationships.category.data.id)
            return (
              <Grid item key={task.attributes.id}>
                <Task task={task} tag={tag} handleDone={handleDone} handleDelete={handleDelete} />
              </Grid>
            )
          })
        }
        <Grid item>
          <Task />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TaskList
