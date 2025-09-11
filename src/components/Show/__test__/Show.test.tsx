import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Show from '../Show'
import { Box, Typography } from '@mui/material'

describe('Show component', () => {
  it('expects to render children', () => {
    const { getByTestId, getByText } = render(
      <Show when={true}>
        <Box data-testid="box">
          <Typography>Content</Typography>
        </Box>
      </Show>
    )

    expect(getByTestId('box')).toBeInTheDocument()
    expect(getByText('Content')).toBeInTheDocument()
  })

  it('expects not to render children', () => {
    const { queryByText, queryByTestId } = render(
      <Show when={false}>
        <Box data-testid="box">
          <Typography>Content</Typography>
        </Box>
      </Show>
    )

    expect(queryByTestId('box')).not.toBeInTheDocument()
    expect(queryByText('Content')).not.toBeInTheDocument()
  })
})
