import { darken, lighten } from '@material-ui/core'
import { SimplePaletteColorOptions } from '@material-ui/core/styles/createPalette'
import clone from 'lodash/clone'

export const generateDarkAndLight = (
  pallete: SimplePaletteColorOptions,
  lightShade: number = 0.75,
  darkShade: number = 0.3,
) => {
  const newPallete: any = clone(pallete)
  newPallete.dark = darken(pallete.main, darkShade)
  newPallete.light = lighten(pallete.main, lightShade)
  return newPallete
}
