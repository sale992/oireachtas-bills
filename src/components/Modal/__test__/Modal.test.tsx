import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import Modal from '../Modal'
import { Box, Typography } from '@mui/material'

describe('Modal', () => {
  it('expects to close modal', () => {
    const onCloseMock = vi.fn()

    const { getByLabelText } = render(
      <Modal open={true} onClose={onCloseMock}>
        <Box data-testid="modal-content">
          <Typography>Modal Content</Typography>
        </Box>
      </Modal>
    )

    const closeButton = getByLabelText('Close modal')
    fireEvent.click(closeButton)

    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
