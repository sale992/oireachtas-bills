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

declare module '@mui/material/styles' {
  interface TypographyVariants {
    title: React.CSSProperties
    text: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    title?: React.CSSProperties
    text?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true
    text: true
  }
}
