import {
  Typography,
  CircularProgress,
  TableRow,
  TablePagination,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  IconButton,
  Stack,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

import CustomTableHead from './components/CustomTableHead/CustomTableHead'
import { type MappedBill } from '@/types/bills'

interface IBillsTableProps {
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
    setRowsPerPage(parseInt(event.target.value))
    setPage(0)
  }

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>, row: MappedBill) => {
    e.stopPropagation()
    onHandleFavorite(row)
  }

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" height={400}>
        <CircularProgress />
      </Stack>
    )
  }

  if (!bills.length) {
    return (
      <Stack justifyContent="center" alignItems="center" height={400}>
        <Typography variant="h6" color="textSecondary">
          No bills data available
        </Typography>
      </Stack>
    )
  }

  return (
    <>
      <TableContainer>
        <Table aria-labelledby="Bills" size="medium">
          <CustomTableHead />
          <TableBody>
            {bills.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`
              const isMarkedAsFavorite = isFavorite(row.id)
              return (
                <TableRow
                  hover
                  onClick={() => onRowClick(row)}
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell id={labelId}>{row.billNo}</TableCell>
                  <TableCell>{row.billType}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.sponsor}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleFavoriteClick(e, row)}>
                      <FavoriteIcon sx={{ fill: isMarkedAsFavorite ? 'red' : 'transparent', stroke: 'red' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
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
      />
    </>
  )
}

export default BillsTable
