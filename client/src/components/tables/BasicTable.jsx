import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Tốc độ tăng trưởng", 159, 6.0, 24),
  createData("Định giá", 237, 9.0, 37),
  createData("Hiệu suất hoạt động", 262, 16.0, 24),
  createData("Thanh khoản", 305, 3.7, 67),
  createData("Khả năng quản lý", 356, 16.0, 49),
];

export default function BasicTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Chỉ số</TableCell>
            <TableCell align="right">NVL</TableCell>
            <TableCell align="right">Ngành BĐS</TableCell>
            <TableCell align="right">Toàn thị trường</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="column">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
          <TableRow
            sx={{
              "&:last-child td, &:last-child th,": { border: 0 },
            }}
          >
            <TableCell component="th" scope="column">
              Tổng cộng
            </TableCell>
            <TableCell align="right">1</TableCell>
            <TableCell align="right">2</TableCell>
            <TableCell align="right">3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
