import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getOireachtasBills } from '../bills'
import { apiOireachtas } from '@/services/axios'
import type { BillsParams } from '@/types/bills'
import { billsResponseMock } from '@/__mocks__/billsDataMock'

vi.mock('@/services/axios', () => ({
  apiOireachtas: {
    get: vi.fn(),
  },
}))

describe('getOireachtasBills', () => {
  const params: BillsParams = { skip: 0, limit: 3 }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('expects to fetch data', async () => {
    vi.mocked(apiOireachtas.get).mockResolvedValueOnce({ data: billsResponseMock })

    const result = await getOireachtasBills(params)

    expect(apiOireachtas.get).toHaveBeenCalledWith('/legislation', { params })
    expect(result).toEqual(billsResponseMock)
  })

  it('expects to throw an error', async () => {
    vi.mocked(apiOireachtas.get).mockRejectedValueOnce(new Error('Network error'))

    await expect(getOireachtasBills(params)).rejects.toThrow('Network error')
    expect(apiOireachtas.get).toHaveBeenCalledWith('/legislation', { params })
  })
})
