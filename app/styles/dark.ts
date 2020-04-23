import { red } from '@material-ui/core/colors'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { generateDarkAndLight } from './utils'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    action: {
      active: '#fff',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
    },
    text: {
      disabled: 'rgba(255, 255, 255, 0.5)',
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    primary: {
      main: '#BB86FC',
    },
    secondary: {
      main: '#03DAC6',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    loading: generateDarkAndLight(
      {
        main: '#81d4fa',
      },
      0.6,
      0.6,
    ),
    tertiary: generateDarkAndLight(
      {
        main: '#e57373',
      },
      0.6,
      0.6,
    ),
    quaternary: generateDarkAndLight(
      {
        main: '#c62828',
      },
      0.6,
      0.6,
    ),
    quinary: generateDarkAndLight(
      {
        main: '#00b0ff',
      },
      0.6,
      0.6,
    ),
    senary: generateDarkAndLight(
      {
        main: '#afb42b',
      },
      0.6,
      0.6,
    ),
    septenary: generateDarkAndLight(
      {
        main: '#558b2f',
      },
      0.6,
      0.6,
    ),
    octonary: generateDarkAndLight(
      {
        main: '#afb42b',
      },
      0.6,
      0.6,
    ),
    nonary: generateDarkAndLight(
      {
        main: '#5c6bc0',
      },
      0.6,
      0.6,
    ),
    denary: generateDarkAndLight(
      {
        main: '#c37d0e',
      },
      0.6,
      0.6,
    ),
    eleventh: generateDarkAndLight(
      {
        main: '#7e57c2',
      },
      0.6,
      0.6,
    ),
    duodenary: generateDarkAndLight(
      {
        main: '#3d5afe',
      },
      0.6,
      0.6,
    ),
    divider: 'rgba(255, 255, 255, 0.12)',
  },
})

export default responsiveFontSizes(theme)
