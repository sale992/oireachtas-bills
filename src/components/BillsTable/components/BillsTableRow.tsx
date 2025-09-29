import { useBillsStore } from '@/stores/useBillsStore'
import theme from '@/theme/theme'
import { type IMappedBill } from '@/types/bills'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import { TableCell, IconButton, TableRow } from '@mui/material'

import RowStatus from './RowStatus'

interface IBillsTableRowProps {
  row: IMappedBill
  onRowClick: (row: IMappedBill) => void
}

const BillsTableRow = ({ row, onRowClick }: IBillsTableRowProps) => {
  const toggleFavoriteBill = useBillsStore((state) => state.toggleFavoriteBill)
  const isFavoriteBill = useBillsStore((state) => state.isFavoriteBill)

  const isMarked = isFavoriteBill(row.id)

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleFavoriteBill(row)
  }

  return (
    <TableRow hover onClick={() => onRowClick(row)} key={row.id} sx={{ cursor: 'pointer' }}>
      <TableCell width={50}>{row.billNo}</TableCell>

      <TableCell width={60}>{row.billType}</TableCell>

      <TableCell width={80} align="center">
        <RowStatus statusType={row.status}></RowStatus>
      </TableCell>

      <TableCell>{row.sponsor}</TableCell>

      <TableCell align="right">
        <IconButton aria-label={isMarked ? 'Remove from favorites' : 'Add to favorites'} onClick={handleFavoriteClick}>
          <BookmarkAddIcon
            sx={{
              fill: isMarked ? theme.palette.primary.main : 'transparent',
              stroke: theme.palette.primary.main,
            }}
          />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default BillsTableRow
