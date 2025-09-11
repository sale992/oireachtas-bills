import { getOireachtasBills } from '@/api/bills/bills'
import { type IBillsParams, type IBillsResponse } from '@/types/bills'
import { getAllSponsors } from '@/utils/functional'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useBills = (params: IBillsParams) => {
  const { data: billsResponse, isPending: isLoadingBills } = useQuery<IBillsResponse>({
    queryKey: ['bills', params],
    queryFn: () => getOireachtasBills(params),
    placeholderData: keepPreviousData,
  })

  const mappedBills = useMemo(() => {
    const data = billsResponse?.results.map(({ bill }) => ({
      ...bill,
      id: bill.uri,
      sponsor: getAllSponsors(bill.sponsors),
    }))

    return (data ?? []).sort((a, b) => Number(a.billNo) - Number(b.billNo))
  }, [billsResponse])

  return {
    bills: mappedBills,
    billsCount: billsResponse?.head?.counts?.billCount ?? 0,
    isLoadingBills,
  }
}
