import { useState } from 'react'

export const useTablePagination = (initialRowsPerPage = 10) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage)

  return {
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
  }
}
