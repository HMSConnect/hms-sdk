import { combineReducers, createStore } from 'redux'
import patientDemographic from './patientDemographic.reducer'

export const rootReducer = combineReducers({
  patientDemographic,
})

const store = createStore(rootReducer)

export default store
