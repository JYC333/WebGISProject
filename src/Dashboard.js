import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ContainerDimensions from 'react-container-dimensions'
import InfoBoard from './InfoBoard';
import Map from './Map';


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
        height: "48.75vh",
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const mapHeightPaper = clsx(classes.mapPaper, classes.mapHeight);
    const infoHeightPaper = clsx(classes.paper, classes.infoHeight);
    const [clickInfo, setClickInfo] = useState();
    const [hoverInfo, setHoverInfo] = useState();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container maxWidth={false} className={classes.container}>
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <Paper className={mapHeightPaper}>
                            <ContainerDimensions>
                                <Map clickInfo={clickInfo} setClickInfo={setClickInfo} hover={setHoverInfo} />
                            </ContainerDimensions>
                            {/* <Button variant="contained" color="primary" onClick={() => {
                                test.current.changeGrid(0);
                            }} className="button">Primary</Button> */}
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={3}>
                        <Paper className={infoHeightPaper}>
                            <InfoBoard click={clickInfo} hover={hoverInfo} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}