import React, { useState, useEffect } from "react"
import axios from 'axios'
import TagBoard from './TagBoard'
import NewTaskForm from './NewTaskForm'
import { getRandomColor, goTaskInfo, goHome, defaultCategoryId } from './public/data'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        textAlign: "center",
    },
    container: {
        width: "80%",
        margin: "auto",
        padding: "10px",
    },
    header: {
        margin: "20px",
    },
    body: {
        display: "flex",
        marginTop: "20px",
    },
    card: {
        margin: "40px 20px",
        width: "450px",
        height: "320px",
        textAlign: "center",
    },
    cardContent: {
        minHeight: "100%",
        overflow: "hidden",
    },
    tagContainer: {
        textAlign: "left",
    },
    descriptionContainer: {
        wordBreak: "break-all",
        whiteSpace: "normal",
        textAlign: "left",
    },
}));

// for the page where users are able to edit an existing uncompleted task and create a new task

const TaskAction = (props) => {
    const classes = useStyles()

    const [newTask, setNewTask] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [selectedTags, setSelectedTags] = useState([defaultCategoryId])
    const [tagTitle, setTagTitle] = useState("others")

    const id = props.match.params.id
    const action = id ? "Edit" : "New"
    const color = getRandomColor()

    useEffect(() => {

        if (action == "Edit") {
            axios.get(`/api/tasks/${id}`).then(resp => {
                const tagId = parseInt(resp.data.data.relationships.category.data.id)
                setSelectedTags([tagId])
                setNewTask(Object.assign({}, resp.data.data.attributes, { category_id: tagId }))
                setLoaded(true)
            }).catch(resp => {
                console.log(resp)
            })
        } else {
            setNewTask({ title: "", description: "", category_id: defaultCategoryId })
            setLoaded(true)
        }
    }, [])

    const handleSubmit = () => {
        if (action == "Edit") {
            axios.put(`/api/tasks/${id}`, { task: newTask }).then(resp => {
                goTaskInfo(id)
            }).catch(resp => console.log(resp))
        } else {
            axios.post('/api/tasks', { task: newTask }).then(resp => {
                const id = resp.data.data.id
                goTaskInfo(id)
            }).catch(resp => console.log(resp))
        }
    }

    const handleCancel = () => {
        if (action == "Edit") {
            goTaskInfo(id)
        } else {
            goHome()
        }
    }

    const handleDescriptionChange = (e) => {
        const description = e.target.value
        setNewTask(
            Object.assign({}, newTask, { description: description }))
    }

    const handleTitleChange = (e) => {
        const title = e.target.value
        setNewTask(
            Object.assign({}, newTask, { title: title }))
    }

    const handleSelectTag = (selectedTag) => {
        if (selectedTags.includes(selectedTag.attributes.id)) {
            setSelectedTags([defaultCategoryId])
            setTagTitle("others")
            setNewTask(Object.assign({}, newTask, { category_id: defaultCategoryId }))
        } else {
            setSelectedTags([selectedTag.attributes.id])
            setTagTitle(selectedTag.attributes.title)
            setNewTask(Object.assign({}, newTask, { category_id: selectedTag.attributes.id }))
        }
    }

    return (
        <React.Fragment>
            <div className={classes.root}>
                <TagBoard handleSelectTag={handleSelectTag} selectedTags={selectedTags} editable={true} />
                <div className={classes.content}>
                    <div className={classes.container}>
                        <div className={classes.header}>
                            <Typography variant="h3" align="center">{action} Task</Typography>
                        </div>
                        <Divider />
                        <div className={classes.body}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent} style={{ backgroundColor: color }}>
                                    <div className={classes.tagContainer}>
                                        <Chip label={tagTitle}></Chip>
                                    </div>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {newTask.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" className={classes.descriptionContainer}>
                                        {newTask.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Divider orientation="vertical" flexItem />

                            {
                                loaded && 
                                <NewTaskForm handleCancel={handleCancel} newTask={newTask} handleTitleChange={handleTitleChange} 
                                handleDescriptionChange={handleDescriptionChange} handleCancel={handleCancel} handleSubmit={handleSubmit} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TaskAction
