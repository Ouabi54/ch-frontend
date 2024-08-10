import { useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import LinearProgress from '@mui/material/LinearProgress';
import TablePagination from '@mui/material/TablePagination';

import { usePolling } from 'src/redux/context/polling-context';
import { selectCurrentUser } from 'src/redux/features/auth/authSlice';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import RequestTableRow from '../request-table-row';
import RequestTableHead from '../request-table-head';
import RequestTableToolbar from '../request-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';


// ----------------------------------------------------------------------

export default function RequestsView() {
  const { data, loading } = usePolling();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [filterType, setFilterType] = useState('ALL');

  const [filterStatus, setFilterStatus] = useState('ALL');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const currentUser = useSelector(selectCurrentUser);

  const { lastRequests } = data;

  if (loading || !lastRequests) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )
  }

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterByType = (type) => {
    setPage(0);
    setFilterType(type);
  };

  const handleFilterByStatus = (status) => {
    setPage(0);
    setFilterStatus(status);
  };

  const dataFiltered = applyFilter({
    inputData: lastRequests,
    comparator: getComparator(order, orderBy),
    filterName,
    filterType,
    filterStatus,
    currentUser
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Requests</Typography>
      </Stack>

      <Card>
        <RequestTableToolbar
          filterName={filterName}
          filterType={filterType}
          filterStatus={filterStatus}
          onFilterStatus={handleFilterByStatus}
          onFilterName={handleFilterByName}
          onFilterType={handleFilterByType}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <RequestTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'type', label: 'Type' },
                  { id: 'sender', label: 'Sender' },
                  { id: 'target', label: 'Target' },
                  { id: 'status', label: 'Status' },
                  { id: 'date', label: 'Date' },
                  { id: 'actions', label: 'Actions' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <RequestTableRow
                      key={row._id}
                      id={row._id}
                      sender={currentUser._id === row.sender._id ? 'YOU' : row.sender.email}
                      target={currentUser._id === row.target._id ? 'YOU' : row.target.email}
                      status={row.status}
                      date={row.created_at}
                      type={currentUser._id === row.sender._id ? 'SENT' : 'RECEIVED'}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, lastRequests.length)}
                />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={dataFiltered.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
