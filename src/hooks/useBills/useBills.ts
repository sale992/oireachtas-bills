import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { type BillsParams, type BillsResponse } from '../../types/bills'
import { getOireachtasBills } from '../../api/bills/bills'

export const useBills = (options: BillsParams) => {
  const { ...params } = options

  const { data: billsResponse, isLoading: isLoadingBills } = useQuery<BillsResponse>({
    queryKey: ['bills', params],
    queryFn: () => getOireachtasBills(params),
    placeholderData: keepPreviousData,
  })

  const mappedBills = useMemo(() => {
    return billsResponse?.results
      .map(({ bill }) => ({
        id: bill.uri,
        billNo: bill.billNo,
        billType: bill.billType,
        status: bill.status,
        sponsor: bill.sponsors?.[0]?.sponsor?.as?.showAs || 'No sponsor',
        longTitleEn: bill.longTitleEn,
        longTitleGa: bill.longTitleGa 
      }))
      .sort((a, b) => Number(a.billNo) - Number(b.billNo))
  }, [billsResponse])

  return {
    bills: mappedBills ?? [],
    billsCount: billsResponse?.head?.counts?.billCount ?? 0,
    isLoadingBills,
  }
}
