import ThemeManager from '../styles/ThemeManager'

export const themeChange = (themeName: string) => {
  const themeObject = ThemeManager.getThemeObject(themeName)
  return {
    payload: { themeName, themeObject },
    type: 'THEME_CHANGE',
  }
}

export const themeObjectSet = (themeObject: any) => {
  return {
    payload: themeObject,
    type: 'THEME_SET',
  }
}

export const themeCustom = (customThemeObject: any, themeName?: string) => {
  const themeObject = ThemeManager.mergeThemeWithCustomTheme(
    ThemeManager.getThemeObject(themeName),
    customThemeObject,
  )
  return {
    payload: { themeName, themeObject },
    type: 'THEME_CHANGE',
  }
}
