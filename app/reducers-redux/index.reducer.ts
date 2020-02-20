import { combineReducers, createStore } from 'redux'
import patientSummaryCards from './patientSummaryCards.reducer'
export const rootReducer = combineReducers({
  patientSummaryCards,
})

const store = createStore(rootReducer)

export default store
