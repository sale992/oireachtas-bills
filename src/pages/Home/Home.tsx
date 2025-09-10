import { Container, Select, MenuItem, type SelectChangeEvent, Typography, Box } from '@mui/material'
import BillsTable from '@/components/BillsTable/BillsTable'
import { useBills } from '@/hooks/useBills/useBills'
import { useMemo, useState } from 'react'
import { useBillsStore } from '@/stores/useBillsStore'
import Tabs from '@/components/Tabs/Tabs'
import Modal from '@/components/Modal/Modal'
import { useToggleState } from '@/hooks/useToggleState/useToggleState'
import { type MappedBill } from '@/types/bills'
import { useTablePagination } from '@/hooks/useTablePagination/useTablePagination'
import { removeHtmlTags } from '@/utils/functional'

const Home = () => {
  const [type, setType] = useState<'all' | 'private' | 'public'>('all')
  const [selectedBill, setSelectedBill] = useState<MappedBill | null>(null)

  const billsPagination = useTablePagination()
  const favoriteBillsPagination = useTablePagination()

  const [openModal, toggleModal] = useToggleState()

  const { favoriteBills, toggleFavoriteBill, isFavoriteBill: isFavorite } = useBillsStore()

  const { bills, isLoadingBills, billsCount } = useBills({
    limit: billsPagination.rowsPerPage,
    skip: billsPagination.rowsPerPage * billsPagination.page,
  })

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as 'all' | 'private' | 'public')
  }

  const filteredBills = useMemo(() => {
    if (type === 'all') return bills

    return bills.filter((bill) => bill.billType.toLowerCase() === type)
  }, [bills, type])

  const handleRowClick = (row: MappedBill) => {
    setSelectedBill(row)
    toggleModal()
  }

  const tabs = [
    {
      label: 'All Bills',
      component: (
        <>
          <Box maxWidth={250}>
            <Select labelId="bills-dropdown" id="bills-dropdown" value={type} onChange={handleChange}>
              {['All', 'Private', 'Public'].map((item) => (
                <MenuItem value={item.toLowerCase()} key={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <BillsTable
            bills={filteredBills}
            isLoading={isLoadingBills}
            page={billsPagination.page}
            setPage={billsPagination.setPage}
            setRowsPerPage={billsPagination.setRowsPerPage}
            rowsPerPage={billsPagination.rowsPerPage}
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
          bills={favoriteBills}
          isLoading={isLoadingBills}
          page={favoriteBillsPagination.page}
          setPage={favoriteBillsPagination.setPage}
          setRowsPerPage={favoriteBillsPagination.setRowsPerPage}
          rowsPerPage={favoriteBillsPagination.rowsPerPage}
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
