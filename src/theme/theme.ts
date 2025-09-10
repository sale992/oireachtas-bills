import { createTheme } from '@mui/material/styles'

import { palette } from './palette'

const theme = createTheme({
  borderRadius: {
    small: 8,
    medium: 16,
    large: 24,
    xl: 99,
  },
  palette,
  typography: (palette) => ({
    allVariants: {
      fontFamily: 'Arial',
      color: palette.text.primary,
    },
  }),
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          margin: 0,
          padding: 0,
        },
        body: {
          height: '100%',
          margin: 0,
          padding: 0,
        },
        '#root': {
          height: '100%',
          display: 'flex',
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          display: 'flex',
          border: '2px solid transparent',
          fontSize: theme.typography.pxToRem(16),
          ':hover': {
            // border: `2px solid ${theme.palette.primary.main}`,
          },
          '&.Mui-focused': {
            // background: theme.palette.primary.light,
            // border: `2px solid ${theme.palette.primary.main}`,
          },
        }),
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: ({ theme }) => ({
          '&&': {
            minHeight: 'unset',
            padding: theme.spacing(1.5, 3, 1.5, 1.5),
            borderRadius: theme.borderRadius.small,
            border: `1px solid ${theme.palette.primary.main}`,
            [theme.breakpoints.down('md')]: {
              paddingRight: theme.spacing(4),
            },
            '& .MuiTypography-root': {
              margin: 0,
              fontWeight: 400,
            },
          },
        }),
      },
    },
  },
})

theme.typography = {
  ...theme.typography,
  title: {
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(32),
    lineHeight: theme.typography.pxToRem(32),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(25),
      lineHeight: theme.typography.pxToRem(25),
    },
  },
  text: {
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(20),
    lineHeight: theme.typography.pxToRem(25),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(14),
    },
  },
}

export default theme
