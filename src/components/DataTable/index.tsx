import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'name' | 'age' | 'address' | 'isActive';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number | string | boolean) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    {
      id: 'age',
      label: 'Age',
      minWidth: 170,
      align: 'right',
      format: (value: string | number | boolean) => {
        if (typeof value === 'number') {
          return value.toLocaleString('en-US');
        }
        return `${value}`; // Handle string and boolean types
      },
    },
    {
      id: 'address',
      label: 'Address',
      minWidth: 170,
      align: 'right',
      format: (value: string | number | boolean) => {
        if (typeof value === 'string') {
          return value;
        }
        return `${value}`; // Handle string and boolean types
      },
    },
    {
      id: 'isActive',
      label: 'Active',
      minWidth: 170,
      align: 'right',
      format: (value: string | number | boolean) => {
        if (typeof value === 'boolean') {
          return value === true ? "True" : "False";
        }
        return ''; // Handle number and string types
      },
    },
  ];

interface Data {
  name: string;
  age: number;
  address: string;
  isActive: boolean;
}

function createData(
  name: string,
  age: number,
  address: string,
  isActive: boolean,
): Data {
  return { name, age, address, isActive };
}

const rows = [
  createData('India', 21, 'IN', true),
  createData('China', 21, 'CN', false),
  createData('Italy', 21, 'IT', true),
  createData('United States', 21, 'US', true),
  createData('Canada', 21, 'CA', true),
  createData('Australia', 21, 'AU', true),
  createData('Germany', 21, 'DE', true),
  createData('Ireland', 21, 'IE', true),
  createData('Mexico', 21, 'MX', true),
  createData('Japan', 21, 'JP', true),
  createData('France', 21, 'FR', true),
  createData('United Kingdom', 21, 'GB', true),
  createData('Russia', 21, 'RU', true),
  createData('Nigeria', 21, 'NG', true),
  createData('Brazil', 21, 'BR', true),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '100%' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.age}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}