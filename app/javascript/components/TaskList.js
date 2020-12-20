import React, { useState, useEffect } from "react"
import axios from 'axios'
import Switch from '@material-ui/core/Switch'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneIcon from '@material-ui/icons/Done';
import { green } from '@material-ui/core/colors';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [list, setList] = useState([])

  // fetch data
  useEffect(() => {
    axios.get('/api/tasks').then(resp => {
      console.log(resp.data.data)
      setTasks(resp.data.data)
    }).catch(resp => {
      console.log(resp)
    })
  }, [])

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '55%',
      margin: 'auto',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid darkgrey',
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    let tasksShown = tasks
    if (!showAll) {
      tasksShown = tasks.filter(task => task.attributes.status != "completed")
    }
    setList(tasksShown.map((task) => {
      const id = task.attributes.id
      const Icon = () => {
        if (task.attributes.status == "completed") {
          return (
            <Tooltip title="completed">
              <DoneIcon style={{ color: green[500] }} />
            </Tooltip>
          )
        } else if (task.attributes.priority == "high") {
          return (
            <Tooltip title="high priority">
              <PriorityHighIcon color="secondary" />
            </Tooltip>
          )
        } else if (task.attributes.priority == "low") {
          return (
            <Tooltip title="low priority">
              <HourglassFullIcon />
            </Tooltip>
          )
        } else {
          return (
            <Tooltip title="medium priority">
              <ScheduleIcon color="primary" />
            </Tooltip>
          )
        }
      }
      return (
        <ListItem
          key={task.attributes.id}
          role={undefined}
          dense
          button
          onClick={handleDone(id)}
          className={classes.item}
        >
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText id={task.attributes.id} primary={task.attributes.title} />
          <ListItemSecondaryAction>
            <Tooltip title="view">
              <IconButton edge="end" aria-label="view" onClick={() => window.location.href = `/tasks/${id}`}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="delete">
              <IconButton edge="end" aria-label="delete" onClick={handleDelete(id)}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
      );
    }))
  }, [showAll, tasks])

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
      console.log(id)
      axios.put(`/api/tasks/${id}`, { task: { status: 'completed' } }).then(resp => {
        setTasks(tasks.map(task => task.id == id ? resp.data.data : task))
      }).catch(resp => {
        console.log(resp)
      })
    }
  }

  const handleToggle = () => {
    setShowAll(!showAll)
  }

  return (
    <React.Fragment>
      {/* <Switch onChange={handleToggle} name="showAll" color="primary" checked={showAll} />
      <small className={classes.toggleLabel}>Show All</small> */}
      <FormControlLabel
        control={<Switch checked={showAll} onChange={handleToggle} name="showAll" color="primary" />}
        label="show all"
      />
      <br></br>
      <List className={classes.root}>
        {list}
      </List>
    </React.Fragment>
  );
}

export default TaskList
