import { mappedBillsMock } from '@/__mocks__/billsDataMock'
import theme from '@/theme/theme'
import { ThemeProvider } from '@mui/material/styles'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import BillsTable from '../BillsTable'

const defaultProps = {
  bills: mappedBillsMock,
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
})
