export default function outputReducer(state: any = [], action: any) {
  switch (action.type) {
    case 'OUTPUT_INIT':
    case 'OUTPUT_RESET':
    case 'IFRAME_SUBMIT':
    case 'IFRAME_RESET':
    case 'IFRAME_REFRESH':
      return []
    case 'OUTPUT_ADD_LOG':
      return [
        {
          log: action.payload,
          timestamp: new Date(),
        },
        ...state,
      ]
    default:
      return state
  }
}
