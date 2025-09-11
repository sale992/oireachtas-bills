import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useBillsStore } from '../useBillsStore'
import { mappedBillsMock } from '@/__mocks__/billsDataMock'

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

  it('should initialize with empty favoriteBills array', () => {
    const { result } = renderHook(() => useBillsStore())

    expect(result.current.favoriteBills).toEqual([])
  })

  it('should add a bill to favorites when toggled', () => {
    const { result } = renderHook(() => useBillsStore())

    act(() => {
      result.current.toggleFavoriteBill(mockBill1)
    })

    expect(result.current.favoriteBills).toHaveLength(1)
    expect(result.current.favoriteBills[0]).toEqual(mockBill1)
    expect(consoleSpy).toHaveBeenCalledWith('Request dispatched: adding bill to favorites on server')
  })

  it('should remove a bill from favorites when toggled again', () => {
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

  it('should handle multiple bills in favorites', () => {
    const { result } = renderHook(() => useBillsStore())

    act(() => {
      result.current.toggleFavoriteBill(mockBill1)
    })

    act(() => {
      result.current.toggleFavoriteBill(mockBill2)
    })

    expect(result.current.favoriteBills).toHaveLength(2)
    expect(result.current.favoriteBills).toContainEqual(mockBill1)
    expect(result.current.favoriteBills).toContainEqual(mockBill2)
  })

  it('should correctly identify if a bill is favorite', () => {
    const { result } = renderHook(() => useBillsStore())

    expect(result.current.isFavoriteBill(mockBill1.id)).toBe(false)

    act(() => {
      result.current.toggleFavoriteBill(mockBill1)
    })

    expect(result.current.isFavoriteBill(mockBill1.id)).toBe(true)
    expect(result.current.isFavoriteBill(mockBill2.id)).toBe(false)
  })

  it('should remove only the correct bill when multiple bills are favorited', () => {
    const { result } = renderHook(() => useBillsStore())

    act(() => {
      result.current.toggleFavoriteBill(mockBill1)
    })

    act(() => {
      result.current.toggleFavoriteBill(mockBill2)
    })

    expect(result.current.favoriteBills).toHaveLength(2)

    act(() => {
      result.current.toggleFavoriteBill(mockBill1)
    })

    expect(result.current.favoriteBills).toHaveLength(1)
    expect(result.current.favoriteBills[0]).toEqual(mockBill2)
    expect(result.current.isFavoriteBill(mockBill1.id)).toBe(false)
    expect(result.current.isFavoriteBill(mockBill2.id)).toBe(true)
  })
})
