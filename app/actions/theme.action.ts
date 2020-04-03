import ThemeManager from '../styles/ThemeManager'

export const themeChange = (theme: string) => {
  const themeObject = ThemeManager.getThemeObject(theme)
  return {
    payload: { theme, themeObject },
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
    payload: { theme: themeName, themeObject },
    type: 'THEME_CHANGE',
  }
}
