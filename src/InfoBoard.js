import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, number, type) {
  return { id, date, name, number, type };
}

const rows = [];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function InfoBoard(props) {
  const classes = useStyles();
  const [id, setId] = useState(0);

  useEffect(() => {
    if (props.info) {
      let data = props.info.properties
      rows.push(createData(id, data.CalendarDateKey, data.StopAreaName, data.StopAreaNumber, data.StopAreaType));
      setId(id + 1);
    } else {
      rows.splice(0, 1);
      setId(id - 1);
    };
  }, [props.info]);

  return (
    <React.Fragment>
      <Title>Point Information</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>CalendarDateKey</TableCell>
            <TableCell>StopAreaName</TableCell>
            <TableCell>StopAreaNumber</TableCell>
            <TableCell>StopAreaType</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.number}</TableCell>
              <TableCell>{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore} />
    </React.Fragment>
  );
}