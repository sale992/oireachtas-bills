import { Stack, CircularProgress } from '@mui/material'

const LoadingState = () => {
  return (
    <Stack alignItems="center" justifyContent="center" height={400}>
      <CircularProgress />
    </Stack>
  )
}
export default LoadingState
