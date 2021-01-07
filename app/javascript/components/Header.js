import React, { useState, useEffect } from "react";
import ListBox from './ListBox';
import axios from 'axios';

import { fade, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    homeButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
        margin: "auto",
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const goHome = () => {
    window.location.href = "/"
}

const Header = () => {
    const classes = useStyles();

    const [ifFocus, setIfFocus] = useState(false)

    const onFocusSearch = () => {
        setIfFocus(true)
    }

    const onBlurSearch = () => {
        setTimeout(() => {
            setIfFocus(false)
        }, 100)
    }

    const onSearch = (e) => {
        setSearchKey(e.target.value)
    }

    const [tasks, setTasks] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [searchKey, setSearchKey] = useState("")

    useEffect(() => {
        axios.get('/api/tasks').then(resp => {
            setTasks(resp.data.data)
            setLoaded(true)
        }).catch(resp => {
            console.log(resp)
        })
    }, [])

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar variant="regular">
                    <IconButton edge="start" className={classes.homeButton} color="inherit" aria-label="home" onClick={goHome}>
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" style={{ marginRight: "auto" }}>
                        Todo Manager
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onFocus={onFocusSearch}
                            onBlur={onBlurSearch}
                            onChange={onSearch}
                        />
                        <span style={{ position: "absolute", top: "100%", zIndex: "100", left: "0px", right: "auto", display: ifFocus ? "block" : "none" }}>
                            <Card style={{ width: "400px", height: "400px" }}>
                                <CardContent>
                                    {loaded && <ListBox tasks={tasks} searchKey={searchKey} />}
                                </CardContent>
                            </Card>
                        </span>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}

export default Header