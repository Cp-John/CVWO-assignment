import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(() => ({
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

// props:
// compulsary: newTask, handleTitleChange, handleDescriptionChange, handleCancel, handleSubmit

const NewTaskForm = (props) => {
    const classes = useStyles()

    const newTask = props.newTask

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <div>
                    <CardContent className={classes.cardContent}>
                        <TextField id="title" label="title" variant="outlined" defaultValue={newTask.title} onChange={props.handleTitleChange} />

                        <br />

                        <TextareaAutosize
                            rowsMax={5}
                            rows={"5"}
                            cols={"40"}
                            className={classes.textarea}
                            defaultValue={newTask.description}
                            aria-label="description"
                            placeholder="Description here ..."
                            onChange={props.handleDescriptionChange}
                        />

                        <br />

                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button variant="contained" color="secondary" onClick={props.handleCancel} className={classes.btn}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={props.handleSubmit} className={classes.btn}>
                            Submit
                        </Button>
                    </CardActions>
                </div>
            </Card>
        </React.Fragment>
    );
}

export default NewTaskForm
