// plugins/vuetify.js

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          veryDark: '#271539',
          primary: '#4C1C70',
          secondary: '#804DA9',
          tertiary: '#B982E0',
          quartiary: '#DAB5EB',
          veryLight: '#FBEBFE',
          white: '#FFFFFF',
          dark: '#1A1A1A',
        },
        variables: {
          fontFamily: 'Montserrat',
        },
      },
      dark: {
        colors: {
          veryDark: '#271539',
          primary: '#4C1C70',
          secondary: '#804DA9',
          tertiary: '#B982E0',
          quartiary: '#DAB5EB',
          veryLight: '#FBEBFE',
          white: '#FFFFFF',
          dark: '#1A1A1A',
        },
        variables: {
          fontFamily: 'Montserrat',
        },
      },
    },
  },
})