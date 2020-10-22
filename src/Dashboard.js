import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import ContainerDimensions from 'react-container-dimensions'
import InfoBoard from './InfoBoard';
import Map from './Map';
import Charts from './Charts';


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
        height: "97.5vh",
    },
    infoHeight: {
        height: "40vh",
    },
    switchHeight: {
        height: "13vh",
    },
    chartHeight: {
        height: "40vh",
    },
}));

function Dashboard() {
    const classes = useStyles();
    const mapHeightPaper = clsx(classes.mapPaper, classes.mapHeight);
    const infoHeightPaper = clsx(classes.paper, classes.infoHeight);
    const switchHeightPaper = clsx(classes.paper, classes.switchHeight);
    const chartHeightPaper = clsx(classes.paper, classes.chartHeight);
    const [clickInfo, setClickInfo] = useState();
    const [hoverInfo, setHoverInfo] = useState();
    const [timeFilter, setTimeFilter] = useState();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <Paper className={mapHeightPaper}>
                            <ContainerDimensions>
                                <Map
                                    clickInfo={clickInfo}
                                    setClickInfo={setClickInfo}
                                    hover={setHoverInfo}
                                    timeFilter={timeFilter}
                                />
                            </ContainerDimensions>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container spacing={1} direction="column">
                            <Grid item>
                                <Paper className={infoHeightPaper}>
                                    <InfoBoard click={clickInfo} hover={hoverInfo} />
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper className={switchHeightPaper}>
                                    {/* <FormControl component="fieldset"> */}
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel
                                            value="start"
                                            control={<Switch color="primary" />}
                                            label="Multi-Select"
                                            labelPlacement="start"
                                        />
                                        {/* <FormControlLabel
                                            value="start"
                                            control={<Switch color="primary" />}
                                            label="Start"
                                            labelPlacement="start"
                                        /> */}
                                    </FormGroup>
                                    {/* </FormControl> */}
                                </Paper>
                            </Grid>
                            <Grid item>
                                <Paper className={chartHeightPaper}>
                                    <Charts setTimeFilter={setTimeFilter} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Dashboard;