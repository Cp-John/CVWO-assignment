import React from "react"
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import ViewListIcon from '@material-ui/icons/ViewList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        margin: "20px auto",
        height: "45px",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconContainer: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

// props:
// showAll, cardMode, searchKey, handleToggle, changeViewMode, handleSearchKeyChange, handleClearSearchKey

const FilterInput = (props) => {
    const classes = useStyles()
    let showAll = props.showAll
    let cardMode = props.cardMode
    let searchKey = props.searchKey

    const handleToggle = props.handleToggle
    const changeViewMode = props.changeViewMode
    const handleSearchKeyChange = props.handleSearchKeyChange
    const handleClearSearchKey = props.handleClearSearchKey

    return (
        <React.Fragment>
            <Paper className={classes.search}>
                <div className={classes.iconContainer} >
                    <SearchIcon color="primary" />
                </div>
                <InputBase
                    className={classes.input}
                    placeholder="Search ..."
                    value={searchKey}
                    onChange={handleSearchKeyChange}
                />
                <div className={classes.iconContainer} >
                    <IconButton onClick={handleClearSearchKey} style={{ display: searchKey ? "block" : "none" }}>
                        <ClearIcon color="primary" />
                    </IconButton>
                </div>
            </Paper>

            <div>
                <Divider />
                <FormControlLabel
                    control={
                        <Switch
                            checked={!showAll}
                            onChange={handleToggle}
                            name="showAll"
                            color="primary"
                        />
                    }
                    label="Show Only Uncompleted"
                />

                <Tooltip title="change view mode">
                    <IconButton color={cardMode ? "primary" : "default"} onClick={changeViewMode}>
                        <ViewListIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </React.Fragment>
    );
}

export default FilterInput
