import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    chip: {
        margin: "8px",
        minWidth: "60px"
    },
}));


const Tag = (props) => {
    const classes = useStyles();
    const [tag, setTag] = useState(props.tag)

    const handleSelect = () => {
        setTag(Object.assign({}, tag, { selected: !tag.selected })) 
    }

    return (
        <Chip
            label={tag.title}
            avatar={<Avatar>M</Avatar>}
            variant="outlined"
            color={tag.selected ? "primary" : "default"}
            onClick={ handleSelect }
            className={classes.chip}
        />
    )
}

export default Tag