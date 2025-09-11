import '@mui/material/ButtonBase'
import '@mui/material/InputBase'
import '@mui/material/styles/createTheme'

declare module '@mui/system' {
  interface Theme {
    borderRadius: {
      small: number | string
      medium: number | string
      large: number | string
      xl: number | string
    }
  }

  interface ThemeOptions {
    borderRadius: {
      small: number | string
      medium: number | string
      large: number | string
      xl: number | string
    }
  }
}
