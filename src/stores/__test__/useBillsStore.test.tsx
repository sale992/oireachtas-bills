import { mappedBillsMock } from '@/__mocks__/billsDataMock'
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { useBillsStore } from '../useBillsStore'

const mockStorage: { [key: string]: string } = {}

const localStorageMock = {
  getItem: (key: string) => mockStorage[key] || null,
  setItem: (key: string, value: string) => {
    mockStorage[key] = value
  },
  removeItem: (key: string) => {
    delete mockStorage[key]
  },
  clear: () => {
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key])
  },
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('useBillsStore', () => {
  const mockBill1 = mappedBillsMock[0]
  const mockBill2 = mappedBillsMock[1]

  beforeEach(() => {
    localStorageMock.clear()
    consoleSpy.mockClear()
    useBillsStore.setState({
      favoriteBills: [],
    })
  })

  it('expects to add a bill to favorites when toggled', () => {
    const { result } = renderHook(() => useBillsStore())

    act(() => {
      result.current.toggleFavoriteBill(mockBill1)
    })

    expect(result.current.favoriteBills).toHaveLength(1)
    expect(result.current.favoriteBills[0]).toEqual(mockBill1)
    expect(consoleSpy).toHaveBeenCalledWith('Request dispatched: adding bill to favorites on server')
  })

  it('expects to remove a bill thats been added to favorites', () => {
    const { result } = renderHook(() => useBillsStore())

    act(() => {
      result.current.toggleFavoriteBill(mockBill1)
    })

    expect(result.current.favoriteBills).toHaveLength(1)

    act(() => {
      result.current.toggleFavoriteBill(mockBill1)
    })

    expect(result.current.favoriteBills).toHaveLength(0)
    expect(consoleSpy).toHaveBeenLastCalledWith('Request dispatched: removing bill from favorites on server')
  })

  it('expects to check if bill is marked as favorite', () => {
    const { result } = renderHook(() => useBillsStore())

    expect(result.current.isFavoriteBill(mockBill1.id)).toBe(false)

    act(() => {
      result.current.toggleFavoriteBill(mockBill1)
    })

    expect(result.current.isFavoriteBill(mockBill1.id)).toBe(true)
    expect(result.current.isFavoriteBill(mockBill2.id)).toBe(false)
  })
})
