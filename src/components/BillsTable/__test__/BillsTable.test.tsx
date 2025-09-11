import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import BillsTable from '../BillsTable'
import theme from '@/theme/theme'
import { mappedBillsMock } from '@/__mocks__/billsDataMock'

const defaultProps = {
  bills: mappedBillsMock,
  isLoading: false,
  page: 0,
  rowsPerPage: 10,
  rowsCount: mappedBillsMock.length,
  setPage: vi.fn(),
  setRowsPerPage: vi.fn(),
  onHandleFavorite: vi.fn(),
  onRowClick: vi.fn(),
  isFavorite: vi.fn().mockReturnValue(false),
}

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('BillsTable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
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

  it('renders all bill data in table rows', () => {
    const { getByText } = renderWithTheme(<BillsTable {...defaultProps} />)

    expect(getByText('65')).toBeInTheDocument()
    expect(getByText('78')).toBeInTheDocument()
    expect(getByText('97')).toBeInTheDocument()
  })

  it('calls onRowClick when a table row is clicked', () => {
    const onRowClick = vi.fn()
    const { getByText } = renderWithTheme(<BillsTable {...defaultProps} onRowClick={onRowClick} />)

    fireEvent.click(getByText('65'))
    expect(onRowClick).toHaveBeenCalledTimes(1)
    expect(onRowClick).toHaveBeenCalledWith(mappedBillsMock[0])
  })

  it('renders favorite buttons for each row', () => {
    const { getAllByRole } = renderWithTheme(<BillsTable {...defaultProps} />)

    const favoriteButtons = getAllByRole('button').filter((button) =>
      button.querySelector('[data-testid="BookmarkAddIcon"]')
    )
    expect(favoriteButtons).toHaveLength(mappedBillsMock.length)
  })

  it('prevents row click when favorite button is clicked', () => {
    const onRowClick = vi.fn()
    const onHandleFavorite = vi.fn()
    const { getAllByRole } = renderWithTheme(
      <BillsTable {...defaultProps} onRowClick={onRowClick} onHandleFavorite={onHandleFavorite} />
    )

    const favoriteButtons = getAllByRole('button').filter((button) =>
      button.querySelector('[data-testid="BookmarkAddIcon"]')
    )

    fireEvent.click(favoriteButtons[0])

    expect(onHandleFavorite).toHaveBeenCalledTimes(1)
    expect(onRowClick).not.toHaveBeenCalled()
  })

  it('displays favorite icon as filled when bill is marked as favorite', () => {
    const isFavorite = vi
      .fn()
      .mockImplementation((billId: string) => billId === 'https://data.oireachtas.ie/ie/oireachtas/bill/2024/65')

    renderWithTheme(<BillsTable {...defaultProps} isFavorite={isFavorite} />)

    expect(isFavorite).toHaveBeenCalledWith('https://data.oireachtas.ie/ie/oireachtas/bill/2024/65')
    expect(isFavorite).toHaveBeenCalledWith('https://data.oireachtas.ie/ie/oireachtas/bill/2024/78')
    expect(isFavorite).toHaveBeenCalledWith('https://data.oireachtas.ie/ie/oireachtas/bill/2023/97')
  })
})

it('calls setPage when page is changed', () => {
  const setPage = vi.fn()

  const { getByLabelText } = renderWithTheme(
    <BillsTable {...defaultProps} setPage={setPage} rowsCount={100} page={0} rowsPerPage={10} />
  )

  const nextPageButton = getByLabelText('Go to next page')
  fireEvent.click(nextPageButton)

  expect(setPage).toHaveBeenCalledWith(1)
})

it('calls setRowsPerPage and resets page when rows per page is changed', () => {
  const setPage = vi.fn()
  const setRowsPerPage = vi.fn()
  const { getByRole } = renderWithTheme(
    <BillsTable
      {...defaultProps}
      setPage={setPage}
      setRowsPerPage={setRowsPerPage}
      rowsCount={50}
      page={2}
      rowsPerPage={10}
    />
  )

  const rowsPerPageSelect = getByRole('combobox')
  fireEvent.mouseDown(rowsPerPageSelect)

  const option25 = getByRole('option', { name: '25' })
  fireEvent.click(option25)

  expect(setRowsPerPage).toHaveBeenCalledWith(25)
  expect(setPage).toHaveBeenCalledWith(0)
})
