import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    // marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0.5)
  },
}));

function createData(id, name, value) {
  return { id, name, value };
}

function InfoBoard(props) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (rows) {
      setRows([]);
    };
    if (props.click) {
      let content = props.click.object;
      setRows([createData(0, "gid", content.gid),
      createData(1, "trajectories", content.trajectories),
      createData(2, "trajectories_start", content.trajectories_start),
      createData(3, "trajectories_end", content.trajectories_end)]);
    };
  }, [props.click]);

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