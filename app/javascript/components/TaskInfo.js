import React, { useState, useEffect } from "react"
import axios from 'axios'
import { colors } from './public/data'
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DoneIcon from '@material-ui/icons/Done';
import { green } from '@material-ui/core/colors'

const handleEdit = (id) => () => {
  window.location.href = `/task/edit/${id}`
}

const handleDelete = (id) => () => {
  axios.delete(`/api/tasks/${id}`).then(resp => {
    window.location.href = "/"
  }).catch(resp => {
    console.log(resp)
  })
}

const useStyles = makeStyles((theme) => ({
  card: {
    width: "400px",
    minHeight: "280px",
    margin: "80px auto",
  },
  cardContent: {
    minHeight: "220px",
    overflow: "hidden",
  },
  descriptionContainer: {
    wordBreak: "break-all",
    whiteSpace: "normal"
  },
  addIconContainer: {
    height: "100%",
  },
  notTicked: {
    color: green[500],
  },
  cardActions: {
    backgroundColor: "#f2f5f8"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const TaskInfo = (props) => {
  const [task, setTask] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [expanded, setExpanded] = useState(true);

  const classes = useStyles()
  const id = props.match.params.id

  useEffect(() => {
    axios.get(`/api/tasks/${id}`).then(resp => {
      setTask(resp.data.data)
      setLoaded(true)
    }).catch(resp => {
      console.log(resp)
    })
  }, [])

  const getDateCreated = () => {
    return task.attributes.created_at.slice(0, 10)
  }

  const getDateUpdated = () => {
    return task.attributes.updated_at.slice(0, 10)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleDone = () => {
    axios.patch(`/api/tasks/${id}`, { status: "completed" }).then(resp => {
      setTask(resp.data.data)
    }).catch(resp => {
      console.log(resp)
    })
  }

  const color = colors[id % colors.length]

  return (
    <React.Fragment>
      {
        loaded && (
          <Card className={classes.card}>
            <CardContent className={classes.cardContent} style={{ backgroundColor: color }}>
              <Typography gutterBottom variant="h5" component="h2">
                {task.attributes.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.descriptionContainer}>
                {task.attributes.description}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>

              <Tooltip title="edit">
                <span>
                  <IconButton color="primary" onClick={handleEdit(id)} disabled={task.attributes.status == "completed"}>
                    <EditIcon />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="delete">
                <IconButton color="secondary" onClick={handleDelete(id)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="done">
                <span>
                  <IconButton onClick={handleDone} disabled={task.attributes.status == "completed"}>
                    <DoneIcon className={clsx(task.attributes.status != "completed" && classes.notTicked)}/>
                  </IconButton>
                </span>
              </Tooltip>

              <IconButton style={{marginLeft: "auto"}}
                className={clsx(classes.expand, expanded && classes.expandOpen)}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>status: {task.attributes.status}</Typography>
                <Typography paragraph>created on: {getDateCreated()}</Typography>
                <Typography paragraph>last updated on: {getDateUpdated()}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        )
      }
    </React.Fragment>
  );

}

export default TaskInfo
