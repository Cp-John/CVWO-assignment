import React, { useState, useEffect } from "react"
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import NewTaskInfo from './NewTaskInfo';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    textAlign: "center",
  },
  container: {
    width: "60%",
    margin: "100px auto",
  }
});

const Task = (props) => {
  const [task, setTask] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [ifUpdate, setIfUpdate] = useState(false)

  useEffect(() => {
    const id = props.match.params.id
    axios.get(`/api/tasks/${id}`).then(resp => {
      setTask(resp.data.data)
      setLoaded(true)
    }).catch(resp => {
      console.log(resp)
    })
  }, [])

  function getDateCreated() {
    return task.attributes.created_at.slice(0, 10)
  }

  function getDateUpdated() {
    return task.attributes.updated_at.slice(0, 10)
  }

  const handleUpdate = () => {
    setIfUpdate(true)
  }

  const handleCancel = () => {
    setIfUpdate(false)
  }

  const goHome = () => {
    window.location.href = "/"
  }

  const classes = useStyles()

  let Body = () => {
    if (ifUpdate) {
      return <NewTaskInfo task={task.attributes} handleCancel={handleCancel} requestType={"update"} />
    } else {
      return (
        <div>
          <div className={classes.header}>
            <h1>{task.attributes.title}</h1>
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
              <caption>created on {getDateCreated()}</caption>
              <caption>last updated on {getDateUpdated()}</caption>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Due date</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{task.attributes.title}</TableCell>
                  <TableCell>{task.attributes.description}</TableCell>
                  <TableCell>{task.attributes.priority}</TableCell>
                  <TableCell>{task.attributes.status}</TableCell>
                  <TableCell>{task.attributes.due_date}</TableCell>
                  <TableCell>
                    <Button color="primary" variant="contained"
                      onClick={handleUpdate} disabled={task.attributes.status == "completed"}>
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )
    }
  }

  return (
    <React.Fragment>
      {
        loaded && (
          <div className={classes.container}>
            <Tooltip title="Home">
              <IconButton size="medium" onClick={goHome}>
                <HomeIcon color="primary" fontSize="large"></HomeIcon>
              </IconButton>
            </Tooltip>
            <Body />
          </div>
        )
      }
    </React.Fragment>
  );

}

export default Task
