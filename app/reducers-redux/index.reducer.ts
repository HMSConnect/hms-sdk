import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import appNavBar from './appNavBar.reducer'
import observationBloodPressureCard from './observation/observationBloodPressureCard.reducer'
import observationBloodPressureGraph from './observation/observationBloodPressureGraph.reducer'
import observationBodyHeightGraph from './observation/observationBodyHeightGraph.reducer'
import observationBodyMassIndexGraph from './observation/observationBodyMassIndexGraph.reducer'
import observationBodyMeasurementCard from './observation/observationBodyMeasurementCard.reducer'
import observationHeartRateCard from './observation/observationHeartRateCard.reducer'
import observationHistoryGraph from './observation/observationHistoryGraph.reducer'
import observationLaboratoryTable from './observation/observationLaboratoryTable.reducer'
import observationSummaryGraph from './observation/observationSummaryGraph.reducer'
import observationTemperatureCard from './observation/observationTemperatureCard.reducer'
import observationTobaccoSmokingStatusCard from './observation/observationTobaccoSmokingStatusCard.reducer'
import patientAllergyIntoleranceTable from './patient/patientAllergyIntoleranceTable.reducer'
import patientAllergyList from './patient/patientAllergyList.reducer'
import patientAllergySummaryCard from './patient/patientAllergySummaryCard.reducer'
import patientCarePlanTable from './patient/patientCarePlanTable.reducer'
import patientClaimTable from './patient/patientClaimTable.reducer'
import patientConditionTable from './patient/patientConditionTable.reducer'
import patientDemographic from './patient/patientDemographic.reducer'
import patientEncounterTimeline from './patient/patientEncounterTimeline.reducer'
import patientImagingStudyTable from './patient/patientImagingStudyTable.reducer'
import patientImmunizationSummaryCard from './patient/patientImmunizationSummaryCard.reducer'
import patientImmunizationTable from './patient/patientImmunizationTable.reducer'
import patientMedicationList from './patient/patientMedicationList.reducer'
import patientMedicationRequestTable from './patient/patientMedicationRequestTable.reducer'
import patientMedicationSummaryCard from './patient/patientMedicationSummaryCard.reducer'
import patientObservationTable from './patient/patientObservationTable.reducer'
import patientPractitioner from './patient/patientPractitioner.reducer'
import patientProcedureTable from './patient/patientProcedureTable.reducer'
import patientSearch from './patient/patientSearch.reducer'
import patientSearchPanel from './patient/patientSearchPanel.reducer'
import patientSearchResultWithPaginate from './patient/patientSearchResultWithPaginate.reducer'
import patientSummary from './patient/patientSummary.reducer'
import patientSummaryCards from './patient/patientSummaryCards.reducer'
import themeApp from './theme.reducer'
import observationBodyTemperatureGraph from './observation/observationBodyTemperatureGraph.reducer'
import observationBodyWeightGraph from './observation/observationBodyWeightGraph.reducer'
import observationHeartRateGraph from './observation/observationHeartRateGraph.reducer'

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
  appNavBar,
  observationBloodPressureCard,
  observationBloodPressureGraph,
  observationBodyHeightGraph,
  observationBodyMassIndexGraph,
  observationBodyMeasurementCard,
  observationBodyTemperatureGraph,
  observationBodyWeightGraph,
  observationHeartRateCard,
  observationHeartRateGraph,
  observationHistoryGraph,
  observationLaboratoryTable,
  observationSummaryGraph,
  observationTemperatureCard,
  observationTobaccoSmokingStatusCard,
  patientAllergyIntoleranceTable,
  patientAllergyList,
  patientAllergySummaryCard,
  patientCarePlanTable,
  patientClaimTable,
  patientConditionTable,
  patientDemographic,
  patientEncounterTimeline,
  patientImagingStudyTable,
  patientImmunizationSummaryCard,
  patientImmunizationTable,
  patientMedicationList,
  patientMedicationRequestTable,
  patientMedicationSummaryCard,
  patientObservationTable,
  patientPractitioner,
  patientProcedureTable,
  patientSearch,
  patientSearchPanel,
  patientSearchResultWithPaginate,
  patientSummary,
  patientSummaryCards,
  themeApp,
})

const store = createStore(rootReducer, enhancer)

export default store
