import { apiOireachtas } from '@/services/axios'
import { type IBillsParams, type IBillsResponse } from '@/types/bills'

export const getOireachtasBills = async (params: IBillsParams): Promise<IBillsResponse> => {
  const { data } = await apiOireachtas.get('/legislation', { params })
  return data
}
