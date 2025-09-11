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
          borderRadius: 10,
          fontSize: theme.typography.pxToRem(16),
          ':hover': {
            border: `2px solid ${theme.palette.primary.light}`,
          },
          '&.Mui-focused': {
            background: theme.palette.primary.light,
          },

          '&.MuiOutlinedInput-root': {
            ':hover': {
              border: '2px solid transparent',
              borderRadius: theme.borderRadius.small,
            },
            '&.Mui-focused': {
              background: 'transparent',
              border: '2px solid transparent',
            },
            '& .MuiOutlinedInput-input': {
              padding: 0,
              fontSize: theme.typography.pxToRem(18),
              color: theme.palette.text.primary,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          },
        }),
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: ({ theme }) => ({
          '&.Mui-focused': {
            background: theme.palette.primary.light,
          },
          '&&': {
            minHeight: 'unset',
            padding: theme.spacing(1.5, 3, 1.5, 1.5),
            borderRadius: theme.borderRadius.small,
            border: `1px solid ${theme.palette.primary.main}`,
            ':hover': {
              outline: `4px solid ${theme.palette.primary.light}`,
            },
          },
        }),
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          marginBottom: 20,
          '& .MuiTabs-indicator': {
            backgroundColor: 'transparent',
          },
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.borderRadius.large,
          fontSize: theme.typography.pxToRem(16),
          textTransform: 'capitalize',
          transition: 'all 0.5s ease',
          marginRight: 15,
          '&:hover': {
            background: theme.palette.primary.light,
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
          },
        }),
      },
    },
  },
})

export default theme
