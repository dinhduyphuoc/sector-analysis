import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function BasicTable({ head, data, aggregate }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{head[0] !== undefined ? head[0] : ""}</TableCell>
            {head.slice(1).map((head) => (
              <TableCell key={head} align="right">
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="column">
                {row.name}
              </TableCell>
              {row.data.map((data) => (
                <TableCell key={data.value} align="right">
                  {data.value}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {aggregate && (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th,": { border: 0 },
              }}
            >
              <TableCell component="th" scope="column">
                {aggregate === "average" ? "Trung bình" : "Tổng"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
