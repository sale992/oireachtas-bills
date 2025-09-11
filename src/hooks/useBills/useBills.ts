import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { type IBillsParams, type IBillsResponse } from '@/types/bills'
import { getOireachtasBills } from '@/api/bills/bills'
import { getAllSponsors } from '@/utils/functional'

export const useBills = (params: IBillsParams) => {
  const { data: billsResponse, isPending: isLoadingBills } = useQuery<IBillsResponse>({
    queryKey: ['bills', params],
    queryFn: () => getOireachtasBills(params),
    placeholderData: keepPreviousData,
  })

  const mappedBills = useMemo(() => {
    const data = billsResponse?.results.map(({ bill }) => ({
      id: bill.uri,
      billNo: bill.billNo,
      billType: bill.billType,
      status: bill.status,
      sponsor: getAllSponsors(bill.sponsors),
      longTitleEn: bill.longTitleEn,
      longTitleGa: bill.longTitleGa,
    }))

    return (data ?? []).sort((a, b) => Number(a.billNo) - Number(b.billNo))
  }, [billsResponse])

  return {
    bills: mappedBills,
    billsCount: billsResponse?.head?.counts?.billCount ?? 0,
    isLoadingBills,
  }
}
