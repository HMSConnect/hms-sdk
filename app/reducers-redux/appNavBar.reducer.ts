type AppNavBarType = 'SET_STRUCTURE_APP_NAV_BAR'

interface IAppNavBarAction {
  type: AppNavBarType
  payload: any
}

export interface IAppNavBarStructure {}

export const initialAppNavBarStructure: IAppNavBarStructure = {}
export const appNavBarInitialState: any = {
  structure: initialAppNavBarStructure,
}
const appNavBar = (state = appNavBarInitialState, action: IAppNavBarAction) => {
  switch (action.type) {
    case 'SET_STRUCTURE_APP_NAV_BAR':
      return {
        ...state,
        structure: {
          ...state.structure,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

export default appNavBar
