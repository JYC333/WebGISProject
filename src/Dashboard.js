import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import ContainerDimensions from 'react-container-dimensions'
import InfoBoard from './InfoBoard';
import Map from './Map';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

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
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: "97.5vh",
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container maxWidth={false} className={classes.container}>
                <Grid item xs={12} md={4} lg={12}>
                    <Paper className={fixedHeightPaper}>
                        <ContainerDimensions>
                            <Map />
                        </ContainerDimensions>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                {/* <Grid item xs={12} md={4} lg={12}>
                            <Paper className={fixedHeightPaper}>
                                <InfoBoard />
                            </Paper>
                        </Grid> */}
            </Container>
        </div>
    );
}