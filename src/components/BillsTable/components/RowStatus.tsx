import { Box, styled } from '@mui/material'

const CustomStatus = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  color: 'white',
  borderRadius: theme.borderRadius.large,
  padding: theme.spacing(0.5, 1),
  fontWeight: 500,
  fontSize: '0.75rem',
}))

const statusColors: Record<string, string> = {
  Current: '#4caf50',
  Withdrawn: '#ff9800',
  Enacted: '#2196f3',
  Rejected: '#f44336',
  Defeated: '#9c27b0',
  Lapsed: '#607d8b',
} as const

const RowStatus = ({ statusType }: { statusType: string }) => {
  const backgroundColor = statusColors[statusType]

  return <CustomStatus bgcolor={backgroundColor}>{statusType}</CustomStatus>
}

export default RowStatus
