import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { useBills } from '../useBills'
import { getOireachtasBills } from '@/api/bills/bills'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { IBillsParams } from '@/types/bills'
import { mappedBillsMock, billsResponseMock } from '@/__mocks__/billsDataMock'

vi.mock('@/api/bills/bills', () => ({
  getOireachtasBills: vi.fn(),
}))

const mockGetOireachtasBills = getOireachtasBills as Mock<typeof getOireachtasBills>

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('useBills', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('expects to fetch data from api and map properties', async () => {
    mockGetOireachtasBills.mockResolvedValue(billsResponseMock)

    const params: IBillsParams = { skip: 0, limit: 10 }

    const { result } = renderHook(() => useBills(params), {
      wrapper,
    })

    expect(result.current.isLoadingBills).toBe(true)
    expect(result.current.bills).toEqual([])
    expect(result.current.billsCount).toBe(0)

    await waitFor(() => expect(result.current.isLoadingBills).toBe(false))

    expect(result.current.bills).toEqual(mappedBillsMock)

    expect(result.current.billsCount).toBe(5921)
    expect(mockGetOireachtasBills).toHaveBeenCalledWith(params)
  })
})
