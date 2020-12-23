import React from "react"
import TaskList from './TaskList'
import TagBoard from "./TagBoard";

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing(3),
    textAlign: "center",
  },
  content: {
    margin: "40px 100px"
  }
}));

const Tasks = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <div className={classes.root}>
        <TagBoard />
        <div className={classes.container}>
          <div>
            <Typography variant="h3" gutterBottom>Todo Manager</Typography>
            <Typography variant="h6" gutterBottom>Make your life more organized!</Typography>
          </div>

          <div className={classes.content}>
            <TaskList />
          </div>
        </div>
      </div>

    </React.Fragment>
  );
}

export default Tasks
