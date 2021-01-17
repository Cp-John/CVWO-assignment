import React, { useState, useEffect } from 'react';
import Tag from './Tag';
import axios from 'axios'
import NewTagForm from './NewTagForm';
import { drawerWidth, goHome, defaultTagName } from './public/data'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "whitesmoke",
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
        margin: "0",
        backgroundColor: "whitesmoke",
        boxShadow: "none",
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
            setTagName("")
        }).catch(resp => {
            console.log(resp)
        })
    }

    const handleTagNameChange = (e) => {
        setTagName(e.target.value)
    }

    const handleDelete = (id) => () => {
        axios.delete(`/api/categories/${id}`).then(resp => {
            goHome()
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
            if (resp.data.data.length == 0) {
                axios.post("/api/categories", { title: defaultTagName }).then(resp => {
                    setTags(resp.data.data)
                    setIfAddTag(false)
                }).catch(resp => {
                    console.log(resp)
                })
            } else {
                setTags(resp.data.data)
            }
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
                                <Fab size="small" color={ifEditTags ? "secondary" : "default"} aria-label="edit" onClick={handleEditTags} className={classes.btn}>
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
                    <NewTagForm handleTagNameChange={handleTagNameChange}
                        isDuplicate={isDuplicate} handleSubmit={handleSubmit} handleCancel={handleCancel} />
                }

            </div>
        </Drawer>
    )
}

export default TagBoard