import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    homeButton: {
        marginRight: theme.spacing(2),
    },
}));

const goHome = () => {
    window.location.href = "/"
}

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="regular">
                    <IconButton edge="start" className={classes.homeButton} color="inherit" aria-label="home" onClick={goHome}>
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Todo Manager
            </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header