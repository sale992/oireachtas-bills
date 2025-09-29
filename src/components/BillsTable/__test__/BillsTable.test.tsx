import { mappedBillsMock } from '@/__mocks__/billsDataMock'
import { useBillsStore } from '@/stores/useBillsStore'
import theme from '@/theme/theme'
import { ThemeProvider } from '@mui/material/styles'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import BillsTable from '../BillsTable'

vi.mock('@/stores/useBillsStore', () => ({
  useBillsStore: vi.fn(),
}))

const mockUseBillsStore = vi.mocked(useBillsStore)

const defaultProps = {
  bills: [...mappedBillsMock],
  isLoading: false,
  page: 0,
  rowsPerPage: 10,
  rowsCount: mappedBillsMock.length,
  onPageChange: vi.fn(),
  onRowsPerPageChange: vi.fn(),
}

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('BillsTable', () => {
  const mockToggleFavoriteBill = vi.fn()
  const mockIsFavoriteBill = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseBillsStore.mockImplementation((selector) => {
      const state = {
        favoriteBills: [],
        toggleFavoriteBill: mockToggleFavoriteBill,
        isFavoriteBill: mockIsFavoriteBill,
      }
      return selector(state)
    })
  })

  it('renders loading spinner when isLoading is true', () => {
    const { getByRole, queryByRole } = renderWithTheme(<BillsTable {...defaultProps} isLoading={true} bills={[]} />)

    expect(getByRole('progressbar')).toBeInTheDocument()
    expect(queryByRole('table')).not.toBeInTheDocument()
  })

  it('renders "No bills data available" when bills array is empty', () => {
    const { getByText } = renderWithTheme(<BillsTable {...defaultProps} bills={[]} rowsCount={0} />)

    expect(getByText('No bills data available')).toBeInTheDocument()
  })

  it('expect to open modal when specific row is clicked', () => {
    const { getByText, getByRole } = renderWithTheme(<BillsTable {...defaultProps} />)

    fireEvent.click(getByText('65'))

    expect(getByRole('dialog')).toBeInTheDocument()
    expect(getByText(/english/i)).toBeInTheDocument()
    expect(getByText(/gaeilge/i)).toBeInTheDocument()
  })

  it('expects to call onPageChange when page is changed', () => {
    const onPageChange = vi.fn()

    const { getByLabelText } = renderWithTheme(
      <BillsTable {...defaultProps} onPageChange={onPageChange} rowsCount={100} page={0} rowsPerPage={10} />
    )

    const nextPageButton = getByLabelText('Go to next page')
    fireEvent.click(nextPageButton)

    expect(onPageChange).toHaveBeenCalledWith(expect.any(Object), 1)
  })

  it('expect to call onRowsPerPageChange when rows per page is changed', () => {
    const onPageChange = vi.fn()
    const onRowsPerPageChange = vi.fn()
    const { getByRole } = renderWithTheme(
      <BillsTable
        {...defaultProps}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsCount={50}
        page={2}
        rowsPerPage={10}
      />
    )

    const rowsPerPageSelect = getByRole('combobox')
    fireEvent.mouseDown(rowsPerPageSelect)

    const option = getByRole('option', { name: '25' })
    fireEvent.click(option)

    expect(rowsPerPageSelect).toBeInTheDocument()
  })

  it('expects to call toggleFavoriteBill when favorite button is clicked', () => {
    mockIsFavoriteBill.mockReturnValue(false)

    const { getAllByRole } = renderWithTheme(<BillsTable {...defaultProps} />)

    const favoriteButtons = getAllByRole('button', { name: /add to favorites/i })
    fireEvent.click(favoriteButtons[0])

    expect(mockToggleFavoriteBill).toHaveBeenCalledWith(mappedBillsMock[0])
  })

  it('expects to show correct favorite button state when bill is marked as favorite', () => {
    mockIsFavoriteBill.mockReturnValue(true)

    const { getAllByRole } = renderWithTheme(<BillsTable {...defaultProps} />)

    const favoriteButtons = getAllByRole('button', { name: /remove from favorites/i })
    expect(favoriteButtons[0]).toBeInTheDocument()
  })
})
