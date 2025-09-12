import NoData from '@/components/BillsTable/components/NoData'
import RenderTable from '@/components/BillsTable/components/RenderTable'
import LoadingState from '@/components/LoadingState/LoadingState'
import { type IMappedBill } from '@/types/bills'
import { TablePagination } from '@mui/material'

export interface IBillsTableProps {
  bills?: IMappedBill[]
  isLoading?: boolean
  page: number
  rowsCount: number
  rowsPerPage: number
  setPage: (page: number) => void
  setRowsPerPage: (row: number) => void
  onRowClick: (row: IMappedBill) => void
}

const BillsTable = (props: IBillsTableProps) => {
  const { bills = [], isLoading, page, rowsPerPage, rowsCount, setPage, setRowsPerPage, onRowClick } = props

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
      <RenderTable bills={bills} onRowClick={onRowClick} />

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
