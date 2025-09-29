import { Box, Select, Typography, type SelectChangeEvent, MenuItem } from '@mui/material'

interface ITypeSelect {
  value: string
  onChange: (e: SelectChangeEvent) => void
  options: string[]
}

const TypeSelect = (props: ITypeSelect) => {
  const { options, ...rest } = props
  return (
    <Box maxWidth={250} my={3}>
      <Typography variant="caption">Filter bills by type</Typography>
      <Select labelId="bills-dropdown" id="bills-dropdown" aria-label="Filter bills by type" {...rest}>
        {options.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default TypeSelect
