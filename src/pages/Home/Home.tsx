import BillsTable from '@/components/BillsTable/BillsTable'
import Tabs from '@/components/Tabs/Tabs'
import TypeSelect from '@/components/TypeSelect/TypeSelect'
import { BILL_TYPE } from '@/constants/billType'
import { useBills } from '@/hooks/useBills/useBills'
import { useTablePagination } from '@/hooks/useTablePagination/useTablePagination'
import { useBillsStore } from '@/stores/useBillsStore'
import { paginate } from '@/utils/functional'
import { Container, Typography } from '@mui/material'
import { useMemo, useState } from 'react'

type BillType = (typeof BILL_TYPE)[keyof typeof BILL_TYPE]

const Home = () => {
  const [type, setType] = useState<BillType>(BILL_TYPE.ALL)

  const billsPagination = useTablePagination()
  const favoriteBillsPagination = useTablePagination()

  const favoriteBills = useBillsStore((state) => state.favoriteBills)

  const { bills, isLoadingBills, billsCount } = useBills({
    limit: billsPagination.rowsPerPage,
    skip: billsPagination.rowsPerPage * billsPagination.page,
  })

  const filteredBills = useMemo(() => {
    if (type === BILL_TYPE.ALL) return bills

    return bills.filter((bill) => bill.billType === type)
  }, [bills, type])

  const paginatedFavoriteBills = useMemo(
    () => paginate(favoriteBills, favoriteBillsPagination.page, favoriteBillsPagination.rowsPerPage),
    [favoriteBills, favoriteBillsPagination.page, favoriteBillsPagination.rowsPerPage]
  )

  const tabs = [
    {
      label: 'All Bills',
      component: (
        <>
          <TypeSelect
            onChange={({ target }) => setType(target.value as BillType)}
            value={type}
            options={Object.values(BILL_TYPE)}
          />

          <BillsTable {...billsPagination} bills={filteredBills} rowsCount={billsCount} isLoading={isLoadingBills} />
        </>
      ),
    },
    {
      label: 'Favorite Bills',
      component: (
        <BillsTable {...favoriteBillsPagination} bills={paginatedFavoriteBills} rowsCount={favoriteBills.length} />
      ),
    },
  ]

  return (
    <Container>
      <Typography variant="h1" my={5} fontSize={35} color="textSecondary">
        Oireachtas bills
      </Typography>

      <Tabs tabs={tabs} />
    </Container>
  )
}

export default Home
