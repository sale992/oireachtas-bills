import { Container, Select, MenuItem, type SelectChangeEvent, Typography } from '@mui/material'
import BillsTable from '../../components/BillsTable/BillsTable'
import { useBills } from '../../hooks/useBills/useBills'
import { useMemo, useState } from 'react'
import { useBillsStore } from '../../stores/useBillsStore'
import Tabs from '../../components/Tabs/Tabs'
import Modal from '../../components/Modal/Modal'
import { useToggleState } from '../../hooks/useToggleState/useToggleState'
import type { MappedBill } from '../../types/bills'
import { removeHtmlTags } from '../../utils/functional'

const Home = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [type, setType] = useState('all')
  const [selectedBill, setSelectedBill] = useState<MappedBill | null>(null)

  const { favoriteBills, toggleFavoriteBill, isFavoriteBill: isFavorite } = useBillsStore()
  const [open, toggleOpen] = useToggleState()

  const { bills, isLoadingBills, billsCount } = useBills({ limit: rowsPerPage, skip: rowsPerPage * page })

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value)
  }

  const filteredBills = useMemo(() => {
    if (type === 'all') return bills

    return bills.filter((bill) => bill.billType.toLowerCase() === type)
  }, [bills, type])

  const handleRowClick = (row: MappedBill) => {
    setSelectedBill(row)
    toggleOpen()
  }

  const tabs = [
    {
      label: 'All Bills',
      component: (
        <>
          <Select labelId="bills-dropdown" id="bills-dropdown" value={type} label="Bill type" onChange={handleChange}>
            {['All', 'Private', 'Public'].map((item) => (
              <MenuItem value={item.toLocaleLowerCase()} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>

          <BillsTable
            bills={filteredBills}
            isLoading={isLoadingBills}
            page={page}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
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
          page={page}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
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
      component: <Typography variant="text">{removeHtmlTags(selectedBill?.longTitleEn ?? '')}</Typography>,
    },
    {
      label: 'Gaeilge',
      component: <Typography variant="text">{removeHtmlTags(selectedBill?.longTitleGa ?? '')}</Typography>,
    },
  ]

  return (
    <Container>
      <Tabs tabs={tabs} />
      <Modal open={open} onClose={toggleOpen}>
        <Tabs tabs={modalTabs} />
      </Modal>
    </Container>
  )
}

export default Home
