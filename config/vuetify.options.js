const base = {
  primary: '#5352ed', // primary main
  primarylight: '#1e90ff', // primary light
  primarydark: '#3742fa', // primary dark
  secondary: '#ff6b81', // secondary main
  secondarylight: '#ff6b81', // secondary light
  secondarydark: '#ff4757', // secondary dark
  anchor: '#5352ed' // link
}

const palette = {
  base
}

export const theme = {
  ...palette.base
}

export default {
  rtl: false,
  theme: {
    dark: false,
    themes: {
      light: {
        ...theme
      },
      dark: {
        ...theme
      }
    },
    options: {
      customProperties: true
    }
  },
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280
    },
    scrollBarWidth: 24
  },
  icons: {
    iconfont: 'mdi' // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  }
}
