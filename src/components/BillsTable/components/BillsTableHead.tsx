import { TableHead, TableRow, TableCell } from '@mui/material'

const cells = [
  {
    id: 'billNo',
    label: 'Bill No',
  },
  {
    id: 'billType',
    label: 'Bill Type',
  },
  {
    id: 'status',
    label: 'Status',
  },
  {
    id: 'sponsor',
    label: 'Sponsor',
  },
  {
    id: 'favorite',
    label: '',
  },
]

const BillsTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {cells.map(({ id, label }) => (
          <TableCell key={id} align="left" padding="normal">
            {label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default BillsTableHead
