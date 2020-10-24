import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ContainerDimensions from 'react-container-dimensions'
import InfoBoard from './InfoBoard';
import SwitchBoard from './SwitchBoard';
import Map from './Map';
import TimeSlider from './TimeSlider';
import DisBar from './DisBar';
import DisPie from './DisPie';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 50,
        width: 200
    },
    mapPaper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
    },
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    mapHeight: {
        height: "74vh",
    },
    infoHeight: {
        height: "40vh",
    },
    switchHeight: {
        height: "32vh",
    },
    chartHeight: {
        height: "24vh",
    },
}));

function Dashboard() {
    const classes = useStyles();
    const mapHeightPaper = clsx(classes.mapPaper, classes.mapHeight);
    const infoHeightPaper = clsx(classes.paper, classes.infoHeight);
    const switchHeightPaper = clsx(classes.mapPaper, classes.switchHeight);
    const chartHeightPaper = clsx(classes.mapPaper, classes.chartHeight);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={3} direction="column">
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <Grid item>
                                <Paper className={mapHeightPaper}>
                                    <ContainerDimensions>
                                        <Map />
                                    </ContainerDimensions>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid container spacing={1} direction="column">
                                <Grid item>
                                    <Paper className={infoHeightPaper}>
                                        <InfoBoard />
                                    </Paper>
                                </Grid>
                                <Grid item>
                                    <Paper className={switchHeightPaper}>
                                        <SwitchBoard />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Paper className={chartHeightPaper}>
                                <TimeSlider />
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={chartHeightPaper}>
                                <DisBar />
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={chartHeightPaper}>
                                <DisPie />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Dashboard;