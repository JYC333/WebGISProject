import React, { useState, useEffect } from 'react';
import ReactFileReader from 'react-file-reader';

import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import useTimeFilter from './store/timeFilter';
import useMaxValue from './store/maxValue';
import useMapEventInfo from './store/mapEventInfo';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 50,
        width: 160
    },
    input: {
        display: 'none',
    },
}));

function SwitchBoard() {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const [intervalF, setIntervalF] = useState();
    const [switchColor, setSwitchColor] = useState(1);
    const [switchDataset, setSwitchDataset] = useState(1);

    const [timeFilterState, timeFilterActions] = useTimeFilter();
    const [maxValueState, maxValueActions] = useMaxValue();
    const [mapEventInfoState, mapEventInfoActions] = useMapEventInfo();

    function Play() {
        let interval = setInterval(() => { setCount(count => count + 1) }, 200);
        setIntervalF(interval);
    };

    function Stop() {
        clearInterval(intervalF);
    };

    useEffect(() => {
        // console.log(count);
        if (timeFilterState.endIndex < maxValueState.maxIndex) {
            timeFilterActions.setStartIndex(timeFilterState.startIndex + 5);
            timeFilterActions.setEndIndex(timeFilterState.endIndex + 5);
        }
        else {
            let inter = timeFilterState.endIndex - timeFilterState.startIndex;
            timeFilterActions.setStartIndex(0);
            timeFilterActions.setEndIndex(inter);
        }
        // console.log(timeFilterState);
    }, [count]);

    function Network() {
        mapEventInfoActions.setShowNetwork(!mapEventInfoState.showNetwork);
    }

    function Trajectory() {
        mapEventInfoActions.setShowTrajectory(!mapEventInfoState.showTrajectory);
    }

    function ColorAttribute(e) {
        setSwitchColor(e.target.value);
        mapEventInfoActions.setColorAttribute(e.target.value);
    }

    function Dataset(e) {
        setSwitchDataset(e.target.value);
        mapEventInfoActions.setDataset(e.target.value);
    }

    function CleanSelect() {
        mapEventInfoActions.setCleanSelect(!mapEventInfoState.cleanSelect);
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary"
                        onClick={Play} fullWidth={true}
                        className="button">Play</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="primary"
                        onClick={Stop} fullWidth={true}
                        className="button">Stop</Button>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <FormControlLabel
                        value="start"
                        control={<Switch color="primary" onChange={Network} />}
                        label="Network"
                        labelPlacement="start"
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        value="start"
                        control={<Switch color="primary" onChange={Trajectory} />}
                        label="Trajectory"
                        labelPlacement="start"
                    />
                </Grid>
            </Grid>
            <FormControl className={classes.formControl}>
                <InputLabel>Color Attribute</InputLabel>
                <Select
                    value={switchColor}
                    onChange={ColorAttribute}
                >
                    <MenuItem value={1}>Trajectories</MenuItem>
                    <MenuItem value={2}>Trajectories Start</MenuItem>
                    <MenuItem value={3}>Trajectories End</MenuItem>
                </Select>
                <FormHelperText>Default Trajectories</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Dataset</InputLabel>
                <Select
                    value={switchDataset}
                    onChange={Dataset}
                >
                    <MenuItem value={1}>Sample1000</MenuItem>
                    <MenuItem value={2}>Sample10000</MenuItem>
                </Select>
                <FormHelperText>Default Sample1000</FormHelperText>
            </FormControl>
            <Button variant="contained" color="primary"
                onClick={CleanSelect} fullWidth={true}
                className="button">Clean Select</Button>
        </div>
    )
}

export default SwitchBoard;