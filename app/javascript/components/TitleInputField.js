import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: '0px auto 40px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const TitleInputField = (props) => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root} onSubmit={props.handleSubmit}>
      <InputBase
        className={classes.input}
        placeholder="Enter title here ..."
        onChange={props.handleChange}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip title="add task">
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <AddIcon color="primary" />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}

export default TitleInputField;