import React from "react"
import TaskCard from './TaskCard'

import Grid from '@material-ui/core/Grid';

const TaskList = (props) => {
  let tasksShown = props.tasksShown
  let tags = props.tags
  const handleDeleteTask = props.handleDeleteTask
  const handleDoneTask = props.handleDoneTask

  return (
    <React.Fragment>
      <Grid container spacing={5}>
        {
          tasksShown.map(task => {
            const tag = tags.find(tag => tag.id == task.relationships.category.data.id)
            return (
              <Grid item key={task.attributes.id}>
                <TaskCard task={task} tag={tag} handleDeleteTask={handleDeleteTask} handleDoneTask={handleDoneTask} />
              </Grid>
            )
          })
        }
        <Grid item>
          <TaskCard />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TaskList
