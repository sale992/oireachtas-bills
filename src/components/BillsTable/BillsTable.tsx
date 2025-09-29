import NoData from '@/components/BillsTable/components/NoData'
import RenderTable from '@/components/BillsTable/components/RenderTable'
import LoadingState from '@/components/LoadingState/LoadingState'
import { useToggleState } from '@/hooks/useToggleState/useToggleState'
import { type IMappedBill } from '@/types/bills'
import { removeHtmlTags } from '@/utils/functional'
import { TablePagination, Typography } from '@mui/material'
import { useState } from 'react'

import Modal from '../Modal/Modal'
import Tabs from '../Tabs/Tabs'

export interface IBillsTableProps {
  bills?: IMappedBill[]
  isLoading?: boolean
  page: number
  rowsCount: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void
  onRowsPerPageChange: (row: React.ChangeEvent<HTMLInputElement>) => void
}

const BillsTable = (props: IBillsTableProps) => {
  const { bills = [], isLoading, page, rowsPerPage, rowsCount, onRowsPerPageChange, onPageChange } = props

  const [openModal, toggleModal] = useToggleState()

  const [selectedBill, setSelectedBill] = useState<IMappedBill | null>(null)

  const handleRowClick = (row: IMappedBill) => {
    setSelectedBill(row)
    toggleModal()
  }

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

  if (isLoading) return <LoadingState />

  if (!bills.length) return <NoData />

  return (
    <>
      <RenderTable bills={bills} onRowClick={handleRowClick} />

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rowsCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        sx={{ mt: 3 }}
      />

      <Modal open={openModal} onClose={toggleModal}>
        <Tabs tabs={modalTabs} />
      </Modal>
    </>
  )
}

export default BillsTable
