import { mappedBillsMock, billsResponseMock } from '@/__mocks__/billsDataMock'
import theme from '@/theme/theme'
import { ThemeProvider } from '@mui/material/styles'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, expect, it, describe } from 'vitest'

import Home from '../Home'

vi.mock('@/hooks/useBills/useBills', () => ({
  useBills: () => ({
    bills: mappedBillsMock,
    isLoadingBills: false,
    billsCount: billsResponseMock.head.counts.billCount,
  }),
}))

vi.mock('@/stores/useBillsStore', () => ({
  useBillsStore: vi.fn((selector) => {
    const mockState = {
      favoriteBills: [mappedBillsMock[0]],
      toggleFavoriteBill: vi.fn(),
      isFavoriteBill: vi.fn(() => true),
    }
    return selector(mockState)
  }),
}))

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('Home page', () => {
  it('expects to render bill rows', () => {
    const { getByText } = renderWithTheme(<Home />)
    mappedBillsMock.forEach((bill) => {
      expect(getByText(bill.billNo)).toBeInTheDocument()
    })
  })

  it('expects to change selected value in the dropdown', async () => {
    const { getAllByRole, findByRole, findByText } = renderWithTheme(<Home />)

    const select = getAllByRole('combobox')[0]
    expect(select).toBeInTheDocument()

    await userEvent.click(select)

    const option = await findByRole('option', { name: /private/i })
    await userEvent.click(option)

    expect(await findByText('Private')).toBeInTheDocument()
  })

  it('expects to render tabs', () => {
    const { getByRole } = renderWithTheme(<Home />)

    expect(getByRole('tab', { name: /all bills/i })).toBeInTheDocument()
    expect(getByRole('tab', { name: /favorite bills/i })).toBeInTheDocument()
  })
})
