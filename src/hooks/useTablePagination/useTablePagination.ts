import { useState } from 'react'

export const useTablePagination = (initialRowsPerPage = 10) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage)

  const onPageChange = (_: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage)
  }

  const onRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value))
    setPage(0)
  }

  return {
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
  }
}
