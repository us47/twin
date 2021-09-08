import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { formatTime } from '../common'

export default function CallHistory({ data }) {
  return (
    <TableContainer >
      <Table aria-label="simple table">
        <TableHead style={{ fontWeight: "fontWeightBold" }}>
          <TableRow>
            <TableCell component="th" align="center">Time</TableCell>
            <TableCell align="center">To</TableCell>
            <TableCell align="right">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.time}>
              <TableCell align="center">
                {formatTime(row.time)}
              </TableCell>
              <TableCell align="center">{row.from}</TableCell>
              <TableCell align="center">{`${row.duration / 60} Min`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
