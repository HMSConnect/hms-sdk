import outputReducer from './outputReducer'
import _ from 'lodash'

export const widgetState = {
  iframeState: {
    parameters: {},
    queryParams: {},
    url: '',
  },
  loading: true,
  outputs: [],
  selectedWidget: {},
  tabState: 0,
}

export function widgetReducer(state: any = {}, action: any) {
  if (_.includes('OUTPUT', action.type)) {
    return {
      ...state,
      outputs: outputReducer(state, action),
    }
  }

  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'INIT':
      return {
        ...state,
        ...action.payload,
        loading: false,
      }
    case 'TAB_CHANGE':
      return {
        ...state,
        tabState: action.payload,
      }
    case 'SELECT_WIDGET':
      return {
        ...state,
      }
    case 'IFRAME_QUERY_PARAMS_CHANGE':
      return {
        ...state,
        iframeState: {
          ...state.iframeState,
          queryParams: {
            ...state.iframeState.queryParams,
            [action.payload.type]: action.payload.value,
          },
        },
      }
    case 'IFRAME_PARAMETERS_CHANGE':
      return {
        ...state,
        iframeState: {
          ...state.iframeState,
          parameters: {
            ...state.iframeState.queryParams,
            [action.payload.type]: action.payload.value,
          },
        },
      }

    case 'IFRAME_RESET':
      const split = _.split(_.get(state.widgetSelected, 'path') || '', '#')
      return {
        ...state,
        widgetSelected: {
          ...state.widgetSeleted,
          path: split[1] ? split[0] : split[0] + '#reset',
        },
      }
    case 'IFRAME_REPLACE':
      return {
        ...state,
        iframeState: {
          ...state.iframeState,
          ...action.payload,
        },
      }
    case 'IFRAME_BACK':
    case 'IFRAME_NEXT':
    case 'IFRAME_REFRESH':
    case 'IFRAME_SUBMIT':
      return state
    default:
      return state
  }
}
