import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Typography from '@material-ui/core/Typography';

import useMapEventInfo from './store/mapEventInfo';

const useStyles = makeStyles((theme) => ({
  title: {
    // marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0.5)
  },
}));

function createData(id, name, value) {
  return { id, name, value };
}

function InfoBoard() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [mapEventInfoState, mapEventInfoActions] = useMapEventInfo();
  const clickInfo = mapEventInfoState.clickInfo;

  useEffect(() => {
    if (rows) {
      setRows([]);
    };
    if (clickInfo) {
      let content = clickInfo.object;
      setRows([createData(0, "Gid", content.gid),
      createData(1, "Trajectories", content.trajectories ? content.trajectories.length : 0),
      createData(2, "Trajectories Start", content.trajectories_start ? content.trajectories_start.length : 0),
      createData(3, "Trajectories End", content.trajectories_end ? content.trajectories_end.length : 0),
      createData(4, "Before (Sum)", content.till.reduce((previous, current) => current += previous) + ' m'),
      createData(5, "Inside (Sum)", content.inside.reduce((previous, current) => current += previous) + ' m'),
      createData(6, "After (Sum)", content.past.reduce((previous, current) => current += previous) + ' m')
      ]);
    };
  }, [clickInfo]);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" className={classes.title}>
        Element Infomation
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Attribute</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default InfoBoard;