import theme from '@/theme/theme'
import { type BillStatus } from '@/types/bills'
import { Box, styled } from '@mui/material'

const CustomStatus = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  borderRadius: theme.borderRadius.large,
  padding: theme.spacing(0.5, 1),
}))

const statusColors = {
  Current: theme.palette.status.current,
  Withdrawn: theme.palette.status.withdrawn,
  Enacted: theme.palette.status.enacted,
  Rejected: theme.palette.status.rejected,
  Defeated: theme.palette.status.defeated,
  Lapsed: theme.palette.status.lapsed,
} as const

const BillTypeStatus = ({ statusType }: { statusType: BillStatus }) => {
  return <CustomStatus bgcolor={statusColors[statusType]}>{statusType}</CustomStatus>
}

export default BillTypeStatus
