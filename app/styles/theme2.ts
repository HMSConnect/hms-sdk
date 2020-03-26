import { red } from '@material-ui/core/colors'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { generateDarkAndLight } from './utils'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
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
    tertiary: generateDarkAndLight(
      {
        main: '#BB86FC',
      },
      0.6,
      0.3,
    ),
    quaternary: generateDarkAndLight(
      {
        main: '#03DAC6',
      },
      0.6,
      0.3,
    ),
    quinary: generateDarkAndLight(
      {
        main: '#BB86FC',
      },
      0.6,
      0.3,
    ),
    senary: generateDarkAndLight(
      {
        main: '#03DAC6',
      },
      0.6,
      0.3,
    ),
    septenary: generateDarkAndLight(
      {
        main: '#BB86FC',
      },
      0.6,
      0.3,
    ),
    octonary: generateDarkAndLight(
      {
        main: '#03DAC6',
      },
      0.6,
      0.3,
    ),
    nonary: generateDarkAndLight(
      {
        main: '#BB86FC',
      },
      0.6,
      0.3,
    ),
    denary: generateDarkAndLight(
      {
        main: '#03DAC6',
      },
      0.6,
      0.3,
    ),
    eleventh: generateDarkAndLight({
      main: '#BB86FC',
    }),
    duodenary: generateDarkAndLight({
      main: '#03DAC6',
    }),
    divider: 'rgba(255, 255, 255, 0.12)',
  },
})

export default responsiveFontSizes(theme)
