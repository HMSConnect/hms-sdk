type ObservationHeartRateCardType =
  | 'INIT_PATIENT_SUMMARY'
  | 'SET_STRUCTURE_OBSERVATION_HEART_RATE_CARD'

interface IObservationHeartRateCardAction {
  type: ObservationHeartRateCardType
  payload: any
}

export interface IObservationHeartRateCardStructure {
  headerIconField: boolean
  dateTimeField: boolean
}

export const initialObservationHeartRateCardStructure: IObservationHeartRateCardStructure = {
  dateTimeField: true,
  headerIconField: true,
}
export const observationHeartRateCardInitialState: any = {
  structure: initialObservationHeartRateCardStructure,
}
const observationHeartRateCard = (
  state = observationHeartRateCardInitialState,
  action: IObservationHeartRateCardAction,
) => {
  switch (action.type) {
    case 'INIT_PATIENT_SUMMARY':
      return {
        ...state,
        ...action.payload.observationHeartRateCard,
      }
    case 'SET_STRUCTURE_OBSERVATION_HEART_RATE_CARD':
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

export default observationHeartRateCard
