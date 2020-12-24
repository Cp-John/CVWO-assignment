import React, { useState } from "react"
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
  const [selectedTags, setSelectedTags] = useState([])
  
  const handleSelectTag = (selectedTag) => {
    const id = selectedTag.attributes.id
    if (selectedTags.includes(id)) {
      setSelectedTags([])
    } else {
      setSelectedTags([id])
    }
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <TagBoard selectedTags={selectedTags} handleSelectTag={handleSelectTag} deletable={true} />
        <div className={classes.container}>
          <div>
            <Typography variant="h3" gutterBottom>Todo Manager</Typography>
            <Typography variant="h6" gutterBottom>Make your life more organized!</Typography>
          </div>

          <div className={classes.content}>
            <TaskList selectedTags={selectedTags}/>
          </div>
        </div>
      </div>

    </React.Fragment>
  );
}

export default Tasks
