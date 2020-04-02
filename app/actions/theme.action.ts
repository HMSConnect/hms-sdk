import ThemeManager from '@app/styles/ThemeManager'

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
