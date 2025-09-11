import { render, fireEvent } from '@testing-library/react'
import { vi, expect, it, describe } from 'vitest'
import userEvent from '@testing-library/user-event'

import Home from '../Home'
import { mappedBillsMock, billsResponseMock } from '@/__mocks__/billsDataMock'

vi.mock('@/hooks/useBills/useBills', () => ({
  useBills: () => ({
    bills: mappedBillsMock,
    isLoadingBills: false,
    billsCount: billsResponseMock.head.counts.billCount,
  }),
}))

vi.mock('@/stores/useBillsStore', () => ({
  useBillsStore: () => ({
    favoriteBills: [mappedBillsMock[0]],
    toggleFavoriteBill: vi.fn(),
    isFavoriteBill: vi.fn(() => false),
  }),
}))

describe('Home page', () => {
  it('expects to render bill rows', () => {
    const { getByText } = render(<Home />)
    mappedBillsMock.forEach((bill) => {
      expect(getByText(bill.billNo)).toBeInTheDocument()
    })
  })

  it('expects to change selected value in the dropdown', async () => {
    const { getAllByRole, findByRole, findByText } = render(<Home />)

    const select = getAllByRole('combobox')[0]
    expect(select).toBeInTheDocument()

    await userEvent.click(select)

    const option = await findByRole('option', { name: /private/i })
    await userEvent.click(option)

    expect(await findByText('Private')).toBeInTheDocument()
  })

  it('opens modal when bill row is clicked', () => {
    const { getByText } = render(<Home />)
    const firstBillRow = getByText(mappedBillsMock[0].billNo)
    fireEvent.click(firstBillRow)

    expect(getByText(/english/i)).toBeInTheDocument()
    expect(getByText(/gaeilge/i)).toBeInTheDocument()

  })

  it('expects to render two tab', () => {
    const { getByRole } = render(<Home />)
    expect(getByRole('tab', { name: /all bills/i })).toBeInTheDocument()
    expect(getByRole('tab', { name: /favorite bills/i })).toBeInTheDocument()
  })
})
