import { parse } from '@utils'
import * as _ from 'lodash'
import { generateDarkAndLight } from './utils'
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

  getThemeObject(name: string) {
    try {
      const themeObject = require(`./${name || this.defaultTheme}`)?.default
      return themeObject
    } catch (e) {
      console.info('error load theme: ', e)
      const themeObject = require(`./${this.defaultTheme}`)?.default
      return themeObject
    }
  }

  mergeThemeWithCustomTheme(themeObject: any, custhomThemeObject: any) {
    const test = _.reduce(
      custhomThemeObject,
      (acc, value, key) => {
        let palette = null
        if (key === 'palette') {
          palette = this.createPallete(value)
        }
        return { ...acc, palette }
      },
      {},
    )
    return _.defaultsDeep(test, themeObject)
  }

  createPallete(themeObject: any) {
    return _.reduce(
      themeObject,
      (acc, value, key) => {
        const isDarkMode = value.type === 'dark' ? true : false
        const themeWithDarkLight = generateDarkAndLight(value, isDarkMode)
        const themeObject: any = themeWithDarkLight
        if (_.has(value, 'dark')) {
          themeObject.dark = themeWithDarkLight.dark
        }
        if (_.has(value, 'light')) {
          themeObject.light = themeWithDarkLight.light
        }
        return { ...acc, [key]: themeObject }
      },
      {},
    )
  }

  // mergePalleteWithCustomTheme(oldPallete: any, newPallete: any) {}
}

export default new ThemeManager()
