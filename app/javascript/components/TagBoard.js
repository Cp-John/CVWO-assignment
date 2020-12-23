import React, { useState, useEffect } from 'react';
import Tag from './Tag';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
    tagsContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    formContainer: {
        padding: "10px",
        margin: "200px auto",
        width: "80%",
    },
    addIconContainer: {
        textAlign: "right",
        margin: "5px",
    }
}));


const TagBoard = () => {
    const classes = useStyles();
    const [tags, setTags] = useState([])
    const [ifAddTag, setIfAddTag] = useState(false)
    const [tagName, setTagName] = useState("")

    const handleAddTag = () => {
        setIfAddTag(true)
    }

    const handleCancel = () => {
        setIfAddTag(false)
        setTagName("")
    }

    const handleSubmit = () => {
        console.log(tagName)
    }

    const handleTagNameChange = (e) => {
        setTagName(e.target.value)
    }

    useEffect(() => {
        setTags([
            {
                title: "work",
                selected: false,
            },
            {
                title: "painting",
                selected: false,
            },
            {
                title: "life",
                selected: false,
            },
            {
                title: "reading",
                selected: false,
            },
        ])
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
                        <div className={classes.addIconContainer}>
                            <Fab size="small" color="primary" aria-label="add" onClick={handleAddTag}>
                                <AddIcon />
                            </Fab>
                        </div>
                        <Paper component="ul" className={classes.tagsContainer}>
                            {tags.map(tag => {
                                return (
                                    <li key={tag.title}>
                                        <Tag tag={tag} />
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
                            <TextField label="Tag Name" value={tagName} onChange={handleTagNameChange} />
                        </CardContent>

                        <CardActions>
                            <Button color="primary" size="small" variant="contained" onClick={handleSubmit}>Submit</Button>
                            <Button color="secondary" size="small" variant="contained" onClick={handleCancel}>Cancel</Button>
                        </CardActions>
                    </Card>
                }

            </div>
        </Drawer>
    )
}

export default TagBoard