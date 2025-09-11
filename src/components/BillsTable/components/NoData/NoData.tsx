import { Stack, Typography } from '@mui/material'

const NoData = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height={400}>
      <Typography variant="h6" color="textSecondary">
        No bills data available
      </Typography>
    </Stack>
  )
}

export default NoData
