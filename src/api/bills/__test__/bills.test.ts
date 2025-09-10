import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getOireachtasBills } from '../bills'
import { apiOireachtas } from '@/services/axios'
import type { BillsParams, BillsResponse } from '@/types/bills'

vi.mock('@/services/axios', () => ({
  apiOireachtas: {
    get: vi.fn(),
  },
}))

describe('getOireachtasBills', () => {
  const params: BillsParams = { skip: 0, limit: 10 }

  const mockResponse: BillsResponse = {
    head: {
      counts: {
        resultCount: 1,
        billCount: 1,
      },
    },
    results: [
      {
        bill: {
          act: {
            actNo: '1',
            actYear: '2023',
            dateSigned: '2023-01-01',
            longTitleEn: 'An Act to test',
            longTitleGa: 'Acht tástála',
            shortTitleEn: 'Test Act',
            shortTitleGa: 'Acht Tástála',
            statutebookURI: 'https://example.com/statutebook',
            uri: 'https://example.com/act',
          },
          amendmentLists: [],
          billNo: 'B1',
          billType: 'Government',
          billTypeURI: 'https://example.com/billtype',
          billYear: '2023',
          debates: [],
          events: [],
          lastUpdated: '2023-02-01',
          longTitleEn: 'An Act to test',
          longTitleGa: 'Acht tástála',
          method: 'Method',
          methodURI: 'https://example.com/method',
          mostRecentStage: {
            event: {
              chamber: null,
              dates: [],
              house: null,
              progressStage: 1,
              showAs: 'Stage 1',
              stageCompleted: false,
              stageOutcome: null,
              stageURI: 'https://example.com/stage',
              uri: 'https://example.com/stage',
            },
          },
          originHouse: { showAs: 'Dáil Éireann', uri: 'https://example.com/origin' },
          originHouseURI: 'https://example.com/origin',
          relatedDocs: [],
          shortTitleEn: 'Test Act',
          shortTitleGa: 'Acht Tástála',
          source: 'Source',
          sourceURI: 'https://example.com/source',
          sponsors: [],
          stages: [],
          status: 'In Progress',
          statusURI: 'https://example.com/status',
          uri: 'https://example.com/bill',
          versions: [],
        },
      },
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('expects to fetch data', async () => {
    vi.mocked(apiOireachtas.get).mockResolvedValueOnce({ data: mockResponse })

    const result = await getOireachtasBills(params)

    expect(apiOireachtas.get).toHaveBeenCalledWith('/legislation', { params })
    expect(result).toEqual(mockResponse)
  })

  it('expects to throw an error', async () => {
    vi.mocked(apiOireachtas.get).mockRejectedValueOnce(new Error('Network error'))

    await expect(getOireachtasBills(params)).rejects.toThrow('Network error')
    expect(apiOireachtas.get).toHaveBeenCalledWith('/legislation', { params })
  })
})
