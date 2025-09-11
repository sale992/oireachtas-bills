import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { useTablePagination } from '../useTablePagination'

describe('useTablePagination', () => {
  it('should update page when setPage is called', () => {
    const { result } = renderHook(() => useTablePagination())

    act(() => {
      result.current.setPage(2)
      result.current.setRowsPerPage(25)
    })

    expect(result.current.page).toBe(2)
    expect(result.current.rowsPerPage).toBe(25)
  })
})
