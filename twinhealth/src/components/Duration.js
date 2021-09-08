import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '35ch',
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
}));

export default function Duration({ sendDuration }) {
    const classes = useStyles();
    const [duration, setDuration] = React.useState(5);

    const handleChange = (event) => {
        setDuration(event.target.value);
    };
    useEffect(() => {
        sendDuration(duration)
    }, [duration]);
    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="duration-label">Duration</InputLabel>
                <Select
                    labelId="duration-label"
                    id="duration-label"
                    value={duration}
                    onChange={handleChange}
                    label="Duration"
                >
                    <MenuItem value={5}>5 minutes</MenuItem>
                    <MenuItem value={10}>10 minutes</MenuItem>
                    <MenuItem value={15}>15 minutes</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
