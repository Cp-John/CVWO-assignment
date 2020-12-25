import React, { useState, useEffect } from "react"
import axios from 'axios'
import TagBoard from './TagBoard'
import { colors } from './public/data'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
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
    cardActions: {
        textAlign: "center",
        backgroundColor: "whitesmoke",
    },
    btn: {
        margin: "0 80px",
    },
    textarea: {
        fontSize: "13px",
        letterSpacing: "1px",
        lineHeight: "1.5",
        boxShadow: "1px 1px 1px #999",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        margin: "30px auto",
    },
}));

const TaskAction = (props) => {
    const classes = useStyles()

    const [newTask, setNewTask] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [selectedTags, setSelectedTags] = useState([1])
    const [tagTitle, setTagTitle] = useState("others")
    const [color, setColor] = useState(undefined)

    const id = props.match.params.id
    const action = id ? "Edit" : "New"

    useEffect(() => {
        const rdm = Math.floor(Math.random() * colors.length)
        setColor(colors[rdm])

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
            setNewTask({ title: "", description: "", category_id: 1 })
            setLoaded(true)
        }
    }, [])

    const handleSubmit = () => {
        if (id) {
            axios.put(`/api/tasks/${id}`, { task: newTask }).then(resp => {
                window.location.href = `/taskinfo/${id}`
            }).catch(resp => console.log(resp))
        } else {
            axios.post('/api/tasks', { task: newTask }).then(resp => {
                const id = resp.data.data.id
                window.location.href = `/taskinfo/${id}`
            }).catch(resp => console.log(resp))
        }
    }

    const handleCancel = () => {
        if (id) {
            window.location.href = `/taskinfo/${id}`
        } else {
            window.location.href = "/"
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
            setSelectedTags([1])
            setTagTitle("others")
            setNewTask(Object.assign({}, newTask, { category_id: 1 }))
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

                            <Card className={classes.card}>
                                {
                                    loaded &&
                                    <div>
                                        <CardContent className={classes.cardContent}>
                                            <TextField id="title" label="title" variant="outlined" defaultValue={newTask.title} onChange={handleTitleChange} />

                                            <br />

                                            <TextareaAutosize
                                                rowsMax={5}
                                                rows={"5"}
                                                cols={"40"}
                                                className={classes.textarea}
                                                defaultValue={newTask.description}
                                                aria-label="description"
                                                placeholder="Description here ..."
                                                onChange={handleDescriptionChange}
                                            />

                                            <br />

                                        </CardContent>
                                        <CardActions className={classes.cardActions}>
                                            <Button variant="contained" color="secondary" onClick={handleCancel} className={classes.btn}>
                                                Cancel
                                            </Button>
                                            <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.btn}>
                                                Submit
                                            </Button>
                                        </CardActions>
                                    </div>
                                }
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TaskAction
