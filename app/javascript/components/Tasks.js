import React, { useState } from "react"
import TaskList from './TaskList'
import TagBoard from "./TagBoard";
import ListBox from "./ListBox";

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import ViewListIcon from '@material-ui/icons/ViewList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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
    margin: "30px 100px"
  }
}));

const Tasks = () => {
  const classes = useStyles()
  const [selectedTags, setSelectedTags] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [cardMode, setCardMode] = useState(true)

  const handleSelectTag = (selectedTag) => {
    const id = selectedTag.attributes.id
    if (selectedTags.includes(id)) {
      setSelectedTags([])
    } else {
      setSelectedTags([id])
    }
  }

  const handleToggle = () => {
    setShowAll(!showAll)
  }

  const changeViewMode = () => {
    setCardMode(!cardMode)
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
            <Divider />
            <FormControlLabel
              control={
                <Switch
                  checked={!showAll}
                  onChange={handleToggle}
                  name="showAll"
                  color="primary"
                />
              }
              label="Show Only Uncompleted"
            />

            <Tooltip title="change view mode">
              <IconButton color={cardMode ? "primary" : "default"} onClick={changeViewMode}>
                <ViewListIcon />
              </IconButton>
            </Tooltip>
            {
              cardMode ? <TaskList selectedTags={selectedTags} showAll={showAll} />
                : <ListBox selectedTags={selectedTags} isSearchBox={false} showAll={showAll} />
            }
          </div>
        </div>
      </div>

    </React.Fragment>
  );
}

export default Tasks
