import { apiOireachtas } from '../../services/axios'
import { type BillsParams, type BillsResponse } from '../../types/bills'

export const getOireachtasBills = async (params: BillsParams): Promise<BillsResponse> => {
  const { data } = await apiOireachtas.get('/legislation', { params })
  return data
}
