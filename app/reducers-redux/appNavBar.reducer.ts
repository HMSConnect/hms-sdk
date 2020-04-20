type AppNavBarType = 'SET_STRUCTURE_PATIENT_DEMOGRAPHIC'

interface IAppNavBarAction {
  type: AppNavBarType
  payload: any
}

export const appNavBarInitialState: any = {
  structure: {},
}
const appNavBar = (state = appNavBarInitialState, action: IAppNavBarAction) => {
  switch (action.type) {
    case 'SET_STRUCTURE_PATIENT_DEMOGRAPHIC':
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
