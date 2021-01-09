import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        padding: "10px",
        margin: "200px auto",
        width: "80%",
    },
}));

// display all the tags in a permanent drawer
// props:
// compulsary: handleTagNameChange, isDuplicate, handleSubmit, handleCancel

const NewTagForm = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.formContainer}>
            <CardContent>
                <TextField
                    label="Tag Name"
                    onChange={props.handleTagNameChange}
                    error={props.isDuplicate()}
                />
                <Typography variant="caption" display="block" style={{ display: props.isDuplicate() ? "initial" : "none" }} color="secondary" gutterBottom>
                    The tag already exists!
                </Typography>
            </CardContent>

            <CardActions>
                <Button color="primary" size="small" variant="contained" onClick={props.handleSubmit} disabled={props.isDuplicate()}>Submit</Button>
                <Button color="secondary" size="small" variant="contained" onClick={props.handleCancel}>Cancel</Button>
            </CardActions>
        </Card>
    )
}

export default NewTagForm