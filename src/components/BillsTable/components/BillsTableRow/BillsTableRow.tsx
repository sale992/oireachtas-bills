import { type IMappedBill } from '@/types/bills'
import { TableCell, IconButton, TableRow } from '@mui/material'
import theme from '@/theme/theme'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'

interface IBillsTableRowProps {
  row: IMappedBill
  onRowClick: (row: IMappedBill) => void
  onFavoriteClick: (row: IMappedBill) => void
  isFavorite: (billId: string) => boolean
}

const BillsTableRow = ({ row, onRowClick, onFavoriteClick, isFavorite }: IBillsTableRowProps) => {
  const isMarked = isFavorite(row.id)

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onFavoriteClick(row)
  }

  return (
    <TableRow hover onClick={() => onRowClick(row)} key={row.id} sx={{ cursor: 'pointer' }}>
      <TableCell width={80}>{row.billNo}</TableCell>
      <TableCell width={80}>{row.billType}</TableCell>
      <TableCell width={80}>{row.status}</TableCell>
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
