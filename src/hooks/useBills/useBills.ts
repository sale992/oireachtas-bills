import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { type BillsParams, type BillsResponse } from '@/types/bills'
import { getOireachtasBills } from '@/api/bills/bills'
import { getAllSponsors } from '@/utils/functional'

export const useBills = (params: BillsParams) => {
  const { data: billsResponse, isLoading: isLoadingBills } = useQuery<BillsResponse>({
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
    bills: mappedBills ?? [],
    billsCount: billsResponse?.head?.counts?.billCount ?? 0,
    isLoadingBills,
  }
}
