import { Typography, CircularProgress, TablePagination, TableContainer, TableBody, Table, Stack } from '@mui/material'

import BillsTableHead from './components/BillsTableHead/BillsTableHead'
import BillsTableRow from './components/BillsTableRow/BillsTableRow'
import { type MappedBill } from '@/types/bills'

export interface IBillsTableProps {
  bills?: MappedBill[]
  isLoading?: boolean
  page: number
  rowsCount: number
  rowsPerPage: number
  setPage: (page: number) => void
  setRowsPerPage: (row: number) => void
  onHandleFavorite: (row: MappedBill) => void
  onRowClick: (row: MappedBill) => void
  isFavorite: (billId: string) => boolean
}

const BillsTable = (props: IBillsTableProps) => {
  const {
    bills = [],
    isLoading,
    page,
    rowsPerPage,
    rowsCount,
    setPage,
    setRowsPerPage,
    onHandleFavorite,
    isFavorite,
    onRowClick,
  } = props

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value))
    setPage(0)
  }

  if (isLoading) return <LoadingState />

  if (!bills.length) return <NoData />

  return (
    <>
      <TableContainer>
        <Table aria-labelledby="Bills" size="medium">
          <BillsTableHead />
          <TableBody>
            {bills.map((row) => (
              <BillsTableRow
                key={row.id}
                row={row}
                onRowClick={onRowClick}
                onFavoriteClick={onHandleFavorite}
                isFavorite={isFavorite}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rowsCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 3 }}
      />
    </>
  )
}

export default BillsTable

const LoadingState = () => {
  return (
    <Stack alignItems="center" justifyContent="center" height={400}>
      <CircularProgress />
    </Stack>
  )
}

const NoData = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height={400}>
      <Typography variant="h6" color="textSecondary">
        No bills data available
      </Typography>
    </Stack>
  )
}
