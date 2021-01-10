import React, { useState, useEffect } from "react"
import TaskList from './TaskList'
import TagBoard from "./TagBoard";
import ListBox from "./ListBox";
import FilterInput from './FilterInput'
import axios from 'axios';

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
    margin: "20px 100px"
  },
}));

const Tasks = () => {
  const classes = useStyles()
  const [selectedTags, setSelectedTags] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [cardMode, setCardMode] = useState(true)
  const [searchKey, setSearchKey] = useState("")
  const [tasksShown, setTasksShown] = useState([])
  const [tasks, setTasks] = useState([])
  const [tags, setTags] = useState([])

  const getFilteredTasks = (tasks) => {
    let tempTasks = tasks
    if (!showAll) {
      tempTasks = tasks.filter(task => task.attributes.status != "completed")
    }

    if (selectedTags.length > 0) {
      selectedTags.forEach(tagId => {
        tempTasks = tempTasks.filter(task => {
          return parseInt(task.relationships.category.data.id) == tagId
        })
      });
    }

    if (searchKey) {
      let upperCaseSearchKey = searchKey.toUpperCase()
      tempTasks = tempTasks.filter(task => {
        let upperCaseTitle = task.attributes.title.toUpperCase()
        let upperCaseDescription = task.attributes.description.toUpperCase()
        return upperCaseTitle.includes(upperCaseSearchKey) || upperCaseDescription.includes(upperCaseSearchKey)
      })
    }
    return tempTasks
  }

  useEffect(() => {
    axios.get('/api/tasks').then(resp => {
      setTags(resp.data.included)
      setTasks(resp.data.data)
      setTasksShown(resp.data.data.filter(task => task.attributes.status != "completed"))
    }).catch(resp => {
      console.log(resp)
    })
  }, [])

  useEffect(() => {
    setTasksShown(getFilteredTasks(tasks))
  }, [tasks.length, showAll, selectedTags, searchKey])

  const handleSelectTag = (selectedTag) => {
    const id = selectedTag.attributes.id
    if (selectedTags.includes(id)) {
      setSelectedTags([])
    } else {
      setSelectedTags([id])
    }
  }

  const handleDeleteTask = (id) => () => {
    axios.delete(`/api/tasks/${id}`).then(resp => {
      setTasks(tasks.filter(task => task.id != id))
    }).catch(resp => {
      console.log(resp)
    })
  }

  const handleDoneTask = (id) => () => {
    axios.patch(`/api/tasks/${id}`, { status: "completed" }).then(resp1 => {
      axios.get(`/api/tasks`).then(resp2 => {
        setTasks(resp2.data.data)
        setTasksShown(getFilteredTasks(resp2.data.data))
      }).catch(resp => {
        console.log(resp)
      })
    }).catch(resp => {
      console.log(resp)
    })
  }

  const handleToggle = () => {
    setShowAll(!showAll)
  }

  const changeViewMode = () => {
    setCardMode(!cardMode)
  }

  const handleSearchKeyChange = (e) => {
    setSearchKey(e.target.value)
  }

  const handleClearSearchKey = () => {
    setSearchKey("")
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

          <div className={classes.content} >
            < FilterInput showAll={showAll}
              cardMode={cardMode} searchKey={searchKey} handleToggle={handleToggle}
              changeViewMode={changeViewMode} handleSearchKeyChange={handleSearchKeyChange}
              handleClearSearchKey={handleClearSearchKey} />
            {
              cardMode
                ? <TaskList tasksShown={tasksShown} tags={tags}
                  handleDeleteTask={handleDeleteTask} handleDoneTask={handleDoneTask} />
                : <ListBox tasksShown={tasksShown} tags={tags}
                  handleDeleteTask={handleDeleteTask} handleDoneTask={handleDoneTask} />
            }
          </div>
        </div>
      </div>
    </React.Fragment >
  );
}

export default Tasks
