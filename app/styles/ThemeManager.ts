declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    tertiary?: SimplePaletteColorOptions
    quaternary?: SimplePaletteColorOptions
    quinary?: SimplePaletteColorOptions
    senary?: SimplePaletteColorOptions
    septenary?: SimplePaletteColorOptions
    octonary?: SimplePaletteColorOptions
    nonary?: SimplePaletteColorOptions
    denary?: SimplePaletteColorOptions
    eleventh?: SimplePaletteColorOptions
    duodenary?: SimplePaletteColorOptions
  }
  interface Palette {
    tertiary?: SimplePaletteColorOptions
    quaternary?: SimplePaletteColorOptions
    quinary?: SimplePaletteColorOptions
    senary?: SimplePaletteColorOptions
    septenary?: SimplePaletteColorOptions
    octonary?: SimplePaletteColorOptions
    nonary?: SimplePaletteColorOptions
    denary?: SimplePaletteColorOptions
    eleventh?: SimplePaletteColorOptions
    duodenary?: SimplePaletteColorOptions
  }
}
// declare module '@material-ui/core/styles/createMuiTheme' {
//   interface ThemeOptions {
//     tertiary?: SimplePaletteColorOptions
//   }
// }

class ThemeManager {
  private defaultTheme: any

  setDefaultTheme(name: string) {
    this.defaultTheme = name
  }

  getThmeObject(name: string) {
    const themeObject = require(`./${name || this.defaultTheme}`)?.default
    return themeObject
  }
}

export default new ThemeManager()
