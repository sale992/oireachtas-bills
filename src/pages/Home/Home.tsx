import BillsTable from '@/components/BillsTable/BillsTable'
import Modal from '@/components/Modal/Modal'
import Tabs from '@/components/Tabs/Tabs'
import TypeSelect from '@/components/TypeSelect/TypeSelect'
import { useBills } from '@/hooks/useBills/useBills'
import { useTablePagination } from '@/hooks/useTablePagination/useTablePagination'
import { useToggleState } from '@/hooks/useToggleState/useToggleState'
import { useBillsStore } from '@/stores/useBillsStore'
import { type IMappedBill } from '@/types/bills'
import { paginate, removeHtmlTags } from '@/utils/functional'
import { Container, Typography } from '@mui/material'
import { useMemo, useState } from 'react'

type BillType = 'all' | 'private' | 'public'

const Home = () => {
  const [type, setType] = useState<BillType>('all')
  const [selectedBill, setSelectedBill] = useState<IMappedBill | null>(null)

  const billsPagination = useTablePagination()
  const favoriteBillsPagination = useTablePagination()

  const [openModal, toggleModal] = useToggleState()

  const { favoriteBills } = useBillsStore()

  const { bills, isLoadingBills, billsCount } = useBills({
    limit: billsPagination.rowsPerPage,
    skip: billsPagination.rowsPerPage * billsPagination.page,
  })

  const filteredBills = useMemo(() => {
    if (type === 'all') return bills

    return bills.filter((bill) => bill.billType.toLowerCase() === type)
  }, [bills, type])

  const paginatedFavoriteBills = useMemo(
    () => paginate(favoriteBills, favoriteBillsPagination.page, favoriteBillsPagination.rowsPerPage),
    [favoriteBills, favoriteBillsPagination.page, favoriteBillsPagination.rowsPerPage]
  )

  const handleRowClick = (row: IMappedBill) => {
    setSelectedBill(row)
    toggleModal()
  }

  const tabs = [
    {
      label: 'All Bills',
      component: (
        <>
          <TypeSelect
            onChange={({ target }) => setType(target.value as BillType)}
            value={type}
            options={['All', 'Private', 'Public']}
          />

          <BillsTable
            {...billsPagination}
            bills={filteredBills}
            isLoading={isLoadingBills}
            rowsCount={billsCount}
            onRowClick={handleRowClick}
          />
        </>
      ),
    },
    {
      label: 'Favorite Bills',
      component: (
        <BillsTable
          {...favoriteBillsPagination}
          bills={paginatedFavoriteBills}
          rowsCount={favoriteBills.length}
          onRowClick={handleRowClick}
        />
      ),
    },
  ]

  const modalTabs = [
    {
      label: 'English',
      component: <Typography variant="body1">{removeHtmlTags(selectedBill?.longTitleEn ?? '')}</Typography>,
    },
    {
      label: 'Gaeilge',
      component: <Typography variant="body1">{removeHtmlTags(selectedBill?.longTitleGa ?? '')}</Typography>,
    },
  ]

  return (
    <Container>
      <Typography variant="h1" my={5} fontSize={35} color="textSecondary">
        Oireachtas bills
      </Typography>

      <Tabs tabs={tabs} />

      <Modal open={openModal} onClose={toggleModal}>
        <Tabs tabs={modalTabs} />
      </Modal>
    </Container>
  )
}

export default Home
