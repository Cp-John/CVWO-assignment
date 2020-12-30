import React, { useState, useEffect } from 'react';
import Tag from './Tag';
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    btn: {
        margin: "10px",
    },
    tagsContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: "0"
    },
    formContainer: {
        padding: "10px",
        margin: "200px auto",
        width: "80%",
    },
    actionContainer: {
        textAlign: "right",
    }
}));

// display all the tags in a permanent drawer

const TagBoard = (props) => {
    const classes = useStyles();
    const [tags, setTags] = useState([])
    const [ifAddTag, setIfAddTag] = useState(false)
    const [ifEditTags, setIfEditTags] = useState(false)
    const [tagName, setTagName] = useState("")
    const editable = props.editable
    const deletable = props.deletable

    const handleAddTag = () => {
        setIfAddTag(true)
    }

    const handleEditTags = () => {
        setIfEditTags(!ifEditTags)
    }

    const handleCancel = () => {
        setIfAddTag(false)
        setTagName("")
    }

    const handleSubmit = () => {
        axios.post("/api/categories", { title: tagName }).then(resp => {
            setTags(tags.concat([resp.data.data]))
            setIfAddTag(false)
        }).catch(resp => {
            console.log(resp)
        })
    }

    const handleTagNameChange = (e) => {
        setTagName(e.target.value)
    }

    const handleDelete = (id) => () => {
        axios.delete(`/api/categories/${id}`).then(resp => {
            window.location.href = "/"
        }).catch(resp => {
            console.log(resp)
        })
    }

    const isDuplicate = () => {
        return tags.map(tag => tag.attributes.title).includes(tagName)
    }

    const handleSelect = props.handleSelectTag

    useEffect(() => {
        axios.get("/api/categories").then(resp => {
            setTags(resp.data.data)
        }).catch(resp => {
            console.log(resp)
        })
    }, [])

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                {
                    !ifAddTag &&
                    <div>
                        <div className={classes.actionContainer}>
                            <Tooltip title="edit tags" style={{ display: deletable ? "inlineFlex" : "none" }}>
                                <Fab size="small" color="secondary" aria-label="edit" onClick={handleEditTags} className={classes.btn}>
                                    <EditIcon />
                                </Fab>
                            </Tooltip>
                            <Tooltip title="create a tag" style={{ display: editable ? "inlineFlex" : "none" }}>
                                <Fab size="small" color="primary" aria-label="add" onClick={handleAddTag} className={classes.btn}>
                                    <AddIcon />
                                </Fab>
                            </Tooltip>
                        </div>
                        <Paper component="ul" className={classes.tagsContainer}>
                            {tags.map(tag => {
                                let ifSelected = props.selectedTags.includes(tag.attributes.id)
                                return (
                                    <li key={tag.attributes.id}>
                                        <Tag tag={tag} ifEdit={ifEditTags} ifSelected={ifSelected} handleDelete={handleDelete} handleSelect={handleSelect} />
                                    </li>
                                )
                            })}
                        </Paper>
                    </div>
                }

                {
                    ifAddTag &&
                    <Card className={classes.formContainer}>
                        <CardContent>
                            <TextField
                                label="Tag Name"
                                value={tagName}
                                onChange={handleTagNameChange}
                                error={isDuplicate()}
                            />
                            <Typography variant="caption" display="block" style={ {display: isDuplicate() ? "initial" : "none" }} color="secondary" gutterBottom>
                                The tag already exists!
                            </Typography>
                        </CardContent>

                        <CardActions>
                            <Button color="primary" size="small" variant="contained" onClick={handleSubmit} disabled={isDuplicate()}>Submit</Button>
                            <Button color="secondary" size="small" variant="contained" onClick={handleCancel}>Cancel</Button>
                        </CardActions>
                    </Card>
                }

            </div>
        </Drawer>
    )
}

export default TagBoard