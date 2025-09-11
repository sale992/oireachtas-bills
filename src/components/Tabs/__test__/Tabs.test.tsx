import { Box, Typography } from '@mui/material'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import Tabs from '../Tabs'

describe('Tabs', () => {
  const tabs = [
    {
      label: 'Tab 1',
      component: (
        <Box data-testid="tab1-content">
          <Typography>Content 1</Typography>
        </Box>
      ),
    },
    {
      label: 'Tab 2',
      component: (
        <Box data-testid="tab2-content">
          <Typography>Content 2</Typography>
        </Box>
      ),
    },
  ]

  it('renders all tab labels', () => {
    const { getByText } = render(<Tabs tabs={tabs} />)

    expect(getByText('Tab 1')).toBeInTheDocument()
  })

  it('switches to second tab when clicked', () => {
    const { getByTestId, getByText } = render(<Tabs tabs={tabs} />)

    const btn = getByText('Tab 2')
    fireEvent.click(btn)

    expect(getByTestId('tab2-content')).toBeVisible()
  })
})
