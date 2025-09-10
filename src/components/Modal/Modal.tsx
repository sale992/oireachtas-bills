import CloseIcon from '@mui/icons-material/Close'
import { Dialog, Box, IconButton, Stack, styled } from '@mui/material'

interface IModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

const CustomDialog = styled(Dialog)({
  '.MuiPaper-root': {
    padding: '24px 32px',
    width: '100%',
  },
})

const Modal = ({ open, onClose, children }: IModalProps) => {
  return (
    <CustomDialog open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box height="100%" flex="1">
          {children}
        </Box>

        <Box alignSelf="flex-start">
          <IconButton aria-label="Close modal" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Stack>
    </CustomDialog>
  )
}

export default Modal
