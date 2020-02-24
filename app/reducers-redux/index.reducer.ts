import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import observationHistoryGraph from './observationHistoryGraph.reducer'
import observationLaboratoryTable from './observationLaboratoryTable.reducer'
import observationSummaryGraph from './observationSummaryGraph.reducer'
import patientAllergyList from './patientAllergyList.reducer'
import patientDemographic from './patientDemographic.reducer'
import patientEncounterTimeline from './patientEncounterTimeline.reducer'
import patientMedicationList from './patientMedicationList.reducer'
import patientPhysician from './patientPhysician.reducer'
import patientSummaryCards from './patientSummaryCards.reducer'

const middlewares: any[] = []

const composeEnhancers: any =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)

export const rootReducer = combineReducers({
  observationHistoryGraph,
  observationLaboratoryTable,
  observationSummaryGraph,
  patientAllergyList,
  patientDemographic,
  patientEncounterTimeline,
  patientMedicationList,
  patientPhysician,
  patientSummaryCards,
})

const store = createStore(rootReducer, enhancer)

export default store
