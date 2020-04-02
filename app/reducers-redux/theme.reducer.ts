type ThemeType = 'THEME_CHANGE' | 'THEME_SET'

interface IThemeAction {
  type: ThemeType
  payload: any
}

const initialState: any = {
  themeName: 'normal',
  themeObject: null,
}
const themeType = (state = initialState, action: IThemeAction) => {
  switch (action.type) {
    case 'THEME_CHANGE':
      return {
        ...state,
        ...action.payload,
      }
    case 'THEME_SET':
      return {
        ...state,
        themeObject: action.payload,
      }
    default:
      return state
  }
}

export default themeType
