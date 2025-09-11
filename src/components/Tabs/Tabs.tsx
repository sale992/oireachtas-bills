import Show from '@/components/Show/Show'
import { Box, Tab, Tabs as MuiTabs } from '@mui/material'
import React, { useState } from 'react'

interface ITabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface ITabsProps {
  tabs: { label: string; component: React.ReactNode }[]
}

const CustomTabPanel = (props: ITabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <Box role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      <Show when={value === index}>{children}</Show>
    </Box>
  )
}

const Tabs = ({ tabs }: ITabsProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setActiveTab(newValue)
  return (
    <>
      <MuiTabs value={activeTab} onChange={handleTabChange} aria-label="Tab select" variant="scrollable">
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} id={`tab-${index}`} aria-controls={`tabpanel-${index}`} />
        ))}
      </MuiTabs>

      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={activeTab} index={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </>
  )
}

export default Tabs
