import type { IMappedBill } from '@/types/bills'
import { TableContainer, Table, TableBody } from '@mui/material'

import BillsTableHead from '../BillsTableHead/BillsTableHead'
import BillsTableRow from '../BillsTableRow/BillsTableRow'

interface IRenderTableProps {
  bills: IMappedBill[]
  onRowClick: (row: IMappedBill) => void
}

const RenderTable = ({ bills, onRowClick }: IRenderTableProps) => {
  return (
    <TableContainer>
      <Table aria-labelledby="Bills" size="medium">
        <BillsTableHead />
        <TableBody>
          {bills.map((row) => (
            <BillsTableRow key={row.id} row={row} onRowClick={onRowClick} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default RenderTable
