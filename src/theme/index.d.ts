import '@mui/material/ButtonBase'
import '@mui/material/InputBase'
import '@mui/material/styles'

declare module '@mui/system' {
  interface Theme {
    borderRadius: {
      small: number | string
      large: number | string
    }
  }

  interface ThemeOptions {
    borderRadius: {
      small: number | string
      large: number | string
    }
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    status: {
      current: string
      withdrawn: string
      enacted: string
      rejected: string
      defeated: string
      lapsed: string
    }
  }

  interface PaletteOptions {
    status: {
      current: string
      withdrawn: string
      enacted: string
      rejected: string
      defeated: string
      lapsed: string
    }
  }
}
