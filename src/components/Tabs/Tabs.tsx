import theme from '../../theme/theme'
import { Box, Tab, Tabs as MuiTabs, styled } from '@mui/material'
import React, { useState } from 'react'
import Show from '../Show/Show'

interface ITabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface ITabsProps {
  tabs: { label: string; component: React.ReactNode }[]
}

const CustomTabControl = styled(MuiTabs)({
  marginBottom: 20,
  '& .MuiTab-root': {
    borderRadius: theme.borderRadius.large,
    fontSize: theme.typography.pxToRem(16),
    textTransform: 'capitalize',
    transition: 'all 0.5s ease',
    marginRight: 15,
    '&:nth-of-type(4)': {
      textTransform: 'unset',
    },
    '&:hover': {
      background: theme.palette.primary.light,
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent',
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
})

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
      <CustomTabControl value={activeTab} onChange={handleTabChange} aria-label="Tab select" variant="scrollable">
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </CustomTabControl>

      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={activeTab} index={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </>
  )
}

export default Tabs
