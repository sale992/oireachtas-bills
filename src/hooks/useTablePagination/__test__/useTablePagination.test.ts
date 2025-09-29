import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { useTablePagination } from '../useTablePagination'

describe('useTablePagination', () => {
  it('should update page when onPageChange is called', () => {
    const { result } = renderHook(() => useTablePagination())

    act(() => {
      result.current.onPageChange(null, 2)
    })

    expect(result.current.page).toBe(2)
  })

  it('should update rowsPerPage when onRowsPerPageChange is called', () => {
    const { result } = renderHook(() => useTablePagination())

    act(() => {
      result.current.onRowsPerPageChange({ target: { value: '25' } } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.rowsPerPage).toBe(25)
    expect(result.current.page).toBe(0)
  })
})
