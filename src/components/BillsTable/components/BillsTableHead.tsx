import { TableHead, TableRow, TableCell } from '@mui/material'

const cells = [
  {
    id: 'billNo',
    label: 'Bill No',
    align: 'left' as const,
  },
  {
    id: 'billType',
    label: 'Bill Type',
    align: 'left' as const,
  },
  {
    id: 'status',
    label: 'Status',
    align: 'center' as const,
  },
  {
    id: 'sponsor',
    label: 'Sponsor',
    align: 'left' as const,
  },
  {
    id: 'favorite',
    label: '',
    align: 'right' as const,
  },
]

const BillsTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {cells.map(({ id, label, align }) => (
          <TableCell key={id} align={align} padding="normal">
            {label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default BillsTableHead
