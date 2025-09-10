import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { useBills } from '../useBills'
import { getOireachtasBills } from '@/api/bills/bills'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { BillsResponse, BillsParams } from '@/types/bills'

const mockBillsResponse: BillsResponse = {
  head: {
    counts: {
      resultCount: 2,
      billCount: 2,
    },
  },
  results: [
    {
      bill: {
        uri: 'bill-1',
        billNo: '100',
        billType: 'Public',
        status: 'Enacted',
        sponsors: [
          {
            sponsor: {
              as: { showAs: 'John Doe', uri: '/sponsor/1' },
              by: {
                uri: 'www.www.com',
                showAs: 'test',
              },
              isPrimary: true,
            },
          },
        ],
        longTitleEn: 'English long title 1',
        longTitleGa: 'Irish long title 1',
        act: {
          actNo: '',
          actYear: '',
          dateSigned: '',
          longTitleEn: '',
          longTitleGa: '',
          shortTitleEn: '',
          shortTitleGa: '',
          statutebookURI: '',
          uri: '',
        },
        amendmentLists: [],
        billTypeURI: '',
        billYear: '',
        debates: [],
        events: [],
        lastUpdated: '',
        method: '',
        methodURI: '',
        mostRecentStage: {
          event: {
            chamber: null,
            dates: [],
            house: null,
            progressStage: 0,
            showAs: '',
            stageCompleted: false,
            stageOutcome: null,
            stageURI: '',
            uri: '',
          },
        },
        originHouse: { showAs: '', uri: '' },
        originHouseURI: '',
        relatedDocs: [],
        shortTitleEn: '',
        shortTitleGa: '',
        source: '',
        sourceURI: '',
        stages: [],
        statusURI: '',
        versions: [],
      },
    },
    {
      bill: {
        uri: 'bill-2',
        billNo: '50',
        billType: 'Private',
        status: 'Introduced',
        sponsors: [],
        longTitleEn: 'English long title 2',
        longTitleGa: 'Irish long title 2',
        act: {
          actNo: '',
          actYear: '',
          dateSigned: '',
          longTitleEn: '',
          longTitleGa: '',
          shortTitleEn: '',
          shortTitleGa: '',
          statutebookURI: '',
          uri: '',
        },
        amendmentLists: [],
        billTypeURI: '',
        billYear: '',
        debates: [],
        events: [],
        lastUpdated: '',
        method: '',
        methodURI: '',
        mostRecentStage: {
          event: {
            chamber: null,
            dates: [],
            house: null,
            progressStage: 0,
            showAs: '',
            stageCompleted: false,
            stageOutcome: null,
            stageURI: '',
            uri: '',
          },
        },
        originHouse: { showAs: '', uri: '' },
        originHouseURI: '',
        relatedDocs: [],
        shortTitleEn: '',
        shortTitleGa: '',
        source: '',
        sourceURI: '',
        stages: [],
        statusURI: '',
        versions: [],
      },
    },
  ],
}

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
    mockGetOireachtasBills.mockResolvedValue(mockBillsResponse)

    const params: BillsParams = { skip: 0, limit: 10 }

    const { result } = renderHook(() => useBills(params), {
      wrapper,
    })

    expect(result.current.isLoadingBills).toBe(true)
    expect(result.current.bills).toEqual([])
    expect(result.current.billsCount).toBe(0)

    await waitFor(() => expect(result.current.isLoadingBills).toBe(false))

    expect(result.current.bills).toEqual([
      {
        id: 'bill-2',
        billNo: '50',
        billType: 'Private',
        status: 'Introduced',
        sponsor: 'No sponsor',
        longTitleEn: 'English long title 2',
        longTitleGa: 'Irish long title 2',
      },
      {
        id: 'bill-1',
        billNo: '100',
        billType: 'Public',
        status: 'Enacted',
        sponsor: 'John Doe',
        longTitleEn: 'English long title 1',
        longTitleGa: 'Irish long title 1',
      },
    ])

    expect(result.current.billsCount).toBe(2)
    expect(mockGetOireachtasBills).toHaveBeenCalledWith(params)
  })
})
