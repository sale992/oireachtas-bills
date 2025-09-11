import { Container, Select, MenuItem, type SelectChangeEvent, Typography, Box } from '@mui/material'
import BillsTable from '@/components/BillsTable/BillsTable'
import { useBills } from '@/hooks/useBills/useBills'
import { useMemo, useState } from 'react'
import { useBillsStore } from '@/stores/useBillsStore'
import Tabs from '@/components/Tabs/Tabs'
import Modal from '@/components/Modal/Modal'
import { useToggleState } from '@/hooks/useToggleState/useToggleState'
import { type IMappedBill } from '@/types/bills'
import { useTablePagination } from '@/hooks/useTablePagination/useTablePagination'
import { paginate, removeHtmlTags } from '@/utils/functional'

type BillType = 'all' | 'private' | 'public'

const Home = () => {
  const [type, setType] = useState<BillType>('all')
  const [selectedBill, setSelectedBill] = useState<IMappedBill | null>(null)

  const billsPagination = useTablePagination()
  const favoriteBillsPagination = useTablePagination()

  const [openModal, toggleModal] = useToggleState()

  const { favoriteBills, toggleFavoriteBill, isFavoriteBill: isFavorite } = useBillsStore()

  const { bills, isLoadingBills, billsCount } = useBills({
    limit: billsPagination.rowsPerPage,
    skip: billsPagination.rowsPerPage * billsPagination.page,
  })

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as BillType)
  }

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
          <Box maxWidth={250} my={3}>
            <Typography variant="caption">Filter bills by type</Typography>
            <Select
              labelId="bills-dropdown"
              id="bills-dropdown"
              value={type}
              onChange={handleChange}
              aria-label="Filter bills by type"
            >
              {['All', 'Private', 'Public'].map((item) => (
                <MenuItem value={item.toLowerCase()} key={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <BillsTable
            {...billsPagination}
            bills={filteredBills}
            isLoading={isLoadingBills}
            rowsCount={billsCount}
            onHandleFavorite={toggleFavoriteBill}
            onRowClick={handleRowClick}
            isFavorite={isFavorite}
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
          isLoading={isLoadingBills}
          rowsCount={favoriteBills.length}
          onHandleFavorite={toggleFavoriteBill}
          onRowClick={handleRowClick}
          isFavorite={isFavorite}
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
