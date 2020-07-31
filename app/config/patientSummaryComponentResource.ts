import { ObservationBloodPressureCardWithConnector } from '@components/widget/observation/ObservationBloodPressureCard'
import { ObservationBodyMeasurementCardWithConnector } from '@components/widget/observation/ObservationBodyMeasurementCard'
import { ObservationHeartRateCardWithConnector } from '@components/widget/observation/ObservationHeartRateCard'
import { ObservationHistoryGraphWithConnector } from '@components/widget/observation/ObservationHistoryGraph'
import { ObservationLaboratoryTableWithConnector } from '@components/widget/observation/ObservationLaboratoryTable'
import { ObservationSummaryGraphWithConnector } from '@components/widget/observation/ObservationSummaryGraph'
import { ObservationTemperatureCardWithConnector } from '@components/widget/observation/ObservationTemperatureCard'
import { ObservationTobaccoSmokingStatusCardWithConnector } from '@components/widget/observation/ObservationTobaccoSmokingStatusCard'
import { PatientAllergyListWithConnector } from '@components/widget/patient/PatientAllergyList'
import { PatientAllergySummerCardWithConnector } from '@components/widget/patient/PatientAllergySummaryCard'
import { PatientCarePlanTableWithConnector } from '@components/widget/patient/PatientCarePlanTable'
import { PatientconditionTableWithConnector } from '@components/widget/patient/PatientConditionTable'
import { PatientDemographicWithConnector } from '@components/widget/patient/PatientDemographic'
import { PatientEncounterTimelineWithConnector } from '@components/widget/patient/PatientEncounterTimeline'
import { PatientImmunizationSummerCardWithConnector } from '@components/widget/patient/PatientImmunizationSummaryCard'
import { PatientImmunizationTableWithConnector } from '@components/widget/patient/PatientImmunizationTable'
import { PatientMedicationListWithConnector } from '@components/widget/patient/PatientMedication'
import { PatientMedicationSummaryCardWithConnector } from '@components/widget/patient/PatientMedicationSummaryCard'
import { PatientPractitionerWithConnector } from '@components/widget/patient/PatientPractitioner'
import { PatientProcedureTableWithConnector } from '@components/widget/patient/PatientProcedureTable'
import { PatientSummaryCardsWithConnector } from '@components/widget/patient/PatientSummaryCards'
import environment from '@environment'

const fhirComponentResource: any = {
  observationBloodPressureCard: {
    component: ObservationBloodPressureCardWithConnector,
    defaultPosition: { x: 6, y: 8 },
    layout: { h: 4, w: 2, isCard: true },
  },
  observationBodyMeasurementCard: {
    component: ObservationBodyMeasurementCardWithConnector,
    defaultPosition: { x: 4, y: 8 },
    layout: { h: 4, w: 2, isCard: true },
  },
  observationHeartRateCard: {
    component: ObservationHeartRateCardWithConnector,
    defaultPosition: { x: 6, y: 12 },
    layout: { h: 4, w: 2, isCard: true },
  },
  observationHistoryGraph: {
    component: ObservationHistoryGraphWithConnector,
    defaultPosition: { x: 8, y: 4 },
    layout: { h: 12, w: 4, isCard: true },
  },
  observationLaboratoryTable: {
    component: ObservationLaboratoryTableWithConnector,
    defaultPosition: { x: 0, y: 34 },
    layout: { h: 9, w: 8, isCard: true },
  },
  observationSummaryGraph: {
    component: ObservationSummaryGraphWithConnector,
    defaultPosition: { x: 8, y: 34 },
    layout: { h: 9, w: 4, isCard: true },
  },
  observationTabacoSmokingstatusCard: {
    component: ObservationTobaccoSmokingStatusCardWithConnector,
    defaultPosition: { x: 4, y: 16 },
    layout: { h: 2, w: 4, isCard: true },
  },
  observationTemperatureCard: {
    component: ObservationTemperatureCardWithConnector,
    defaultPosition: { x: 4, y: 12 },
    layout: { h: 4, w: 2, isCard: true },
  },
  patientAllergyList: {
    component: PatientAllergyListWithConnector,
    defaultPosition: { x: 8, y: 0 },
    layout: { h: 4, w: 2, isCard: true },
  },
  patientAllergySummaryCard: {
    component: PatientAllergySummerCardWithConnector,
    defaultPosition: { x: 2, y: 43 },
    layout: { h: 2, w: 2, isCard: true },
  },
  patientCarePlanTable: {
    component: PatientCarePlanTableWithConnector,
    defaultPosition: { x: 6, y: 25 },
    layout: { h: 9, w: 6, isCard: true },
  },
  patientConditionTable: {
    component: PatientconditionTableWithConnector,
    defaultPosition: { x: 6, y: 20 },
    layout: { h: 9, w: 6, isCard: true },
  },
  patientDemographic: {
    component: PatientDemographicWithConnector,
    defaultPosition: { x: 0, y: 0 },
    layout: { h: 4, w: 6, isCard: true },
  },
  patientEncounterTimeline: {
    component: PatientEncounterTimelineWithConnector,
    defaultPosition: { x: 0, y: 4 },
    layout: { h: 12, w: 4, isCard: true },
  },
  patientImmunizationSummaryCard: {
    component: PatientImmunizationSummerCardWithConnector,
    defaultPosition: { x: 0, y: 43 },
    layout: { h: 2, w: 2, isCard: true },
  },
  patientImmunizationTable: {
    component: PatientImmunizationTableWithConnector,
    defaultPosition: { x: 0, y: 20 },
    layout: { h: 9, w: 6, isCard: true },
  },
  patientMedicationList: {
    component: PatientMedicationListWithConnector,
    defaultPosition: { x: 12, y: 0 },
    layout: { h: 4, w: 2, isCard: true },
  },
  patientMedicationSummaryCard: {
    component: PatientMedicationSummaryCardWithConnector,
    defaultPosition: { x: 4, y: 43 },
    layout: { h: 2, w: 2, isCard: true },
  },
  // patientInfoDashboard: {
  //   component: PatientInfoDashboard,
  //   defaultPosition: { x: 8, y: 0 },
  //   layout: { h: 4, w: 4, isCard: true },
  // },
  patientPractitioner: {
    component: PatientPractitionerWithConnector,
    defaultPosition: { x: 6, y: 0 },
    layout: { h: 4, w: 2, isCard: true },
  },
  patientProcedureTable: {
    component: PatientProcedureTableWithConnector,
    defaultPosition: { x: 0, y: 25 },
    layout: { h: 9, w: 6, isCard: true },
  },
  patientSummaryCards: {
    component: PatientSummaryCardsWithConnector,
    // defaultPosition: { x: 4, y: 4 },
    layout: { h: 12, w: 4, isCard: false },
  },
}

const classicComponentResource: any = {
  observationBloodPressureCard: {
    component: ObservationBloodPressureCardWithConnector,
    defaultPosition: { x: 6, y: 8 },
    layout: { h: 4, w: 2, isCard: true },
  },
  observationBodyMeasurementCard: {
    component: ObservationBodyMeasurementCardWithConnector,
    defaultPosition: { x: 4, y: 8 },
    layout: { h: 4, w: 2, isCard: true },
  },
  observationHeartRateCard: {
    component: ObservationHeartRateCardWithConnector,
    defaultPosition: { x: 6, y: 12 },
    layout: { h: 4, w: 2, isCard: true },
  },
  observationHistoryGraph: {
    component: ObservationHistoryGraphWithConnector,
    defaultPosition: { x: 8, y: 4 },
    layout: { h: 12, w: 4, isCard: true },
  },
  observationLaboratoryTable: {
    component: ObservationLaboratoryTableWithConnector,
    defaultPosition: { x: 0, y: 34 },
    layout: { h: 9, w: 6, isCard: true },
  },
  observationSummaryGraph: {
    component: ObservationSummaryGraphWithConnector,
    defaultPosition: { x: 8, y: 34 },
    layout: { h: 9, w: 12, isCard: true },
  },
  // observationTabacoSmokingstatusCard: {
  //   component: ObservationTobaccoSmokingStatusCardWithConnector,
  //   defaultPosition: { x: 4, y: 16 },
  //   layout: { h: 4, w: 4, isCard: true },
  // },
  observationTemperatureCard: {
    component: ObservationTemperatureCardWithConnector,
    defaultPosition: { x: 4, y: 12 },
    layout: { h: 4, w: 2, isCard: true },
  },
  patientAllergyList: {
    component: PatientAllergyListWithConnector,
    defaultPosition: { x: 8, y: 0 },
    layout: { h: 4, w: 2, isCard: true },
  },
  //   patientAllergySummaryCard: {
  //     component: PatientAllergySummerCardWithConnector,
  //     defaultPosition: { x: 2, y: 43 },
  //     layout: { h: 2, w: 2, isCard: true },
  //   },
  patientCarePlanTable: {
    component: PatientCarePlanTableWithConnector,
    defaultPosition: { x: 6, y: 25 },
    layout: { h: 9, w: 6, isCard: true },
  },
  patientConditionTable: {
    component: PatientconditionTableWithConnector,
    defaultPosition: { x: 6, y: 20 },
    layout: { h: 9, w: 6, isCard: true },
  },
  patientDemographic: {
    component: PatientDemographicWithConnector,
    defaultPosition: { x: 0, y: 0 },
    layout: { h: 4, w: 6, isCard: true },
  },
  patientEncounterTimeline: {
    component: PatientEncounterTimelineWithConnector,
    defaultPosition: { x: 0, y: 4 },
    layout: { h: 12, w: 4, isCard: true },
  },
  //   patientImmunizationSummaryCard: {
  //     component: PatientImmunizationSummerCardWithConnector,
  //     defaultPosition: { x: 0, y: 43 },
  //     layout: { h: 2, w: 2, isCard: true },
  //   },
  //   patientImmunizationTable: {
  //     component: PatientImmunizationTableWithConnector,
  //     defaultPosition: { x: 0, y: 20 },
  //     layout: { h: 9, w: 6, isCard: true },
  //   },
  patientMedicationList: {
    component: PatientMedicationListWithConnector,
    defaultPosition: { x: 12, y: 0 },
    layout: { h: 4, w: 2, isCard: true },
  },
  //   patientMedicationSummaryCard: {
  //     component: PatientMedicationSummaryCardWithConnector,
  //     defaultPosition: { x: 4, y: 43 },
  //     layout: { h: 2, w: 2, isCard: true },
  //   },
  patientPractitioner: {
    component: PatientPractitionerWithConnector,
    defaultPosition: { x: 6, y: 0 },
    layout: { h: 4, w: 2, isCard: true },
  },
  patientProcedureTable: {
    component: PatientProcedureTableWithConnector,
    defaultPosition: { x: 0, y: 25 },
    layout: { h: 9, w: 6, isCard: true },
  },
  patientSummaryCards: {
    component: PatientSummaryCardsWithConnector,
    // defaultPosition: { x: 4, y: 4 },
    layout: { h: 12, w: 4, isCard: false },
  },
}
const patientSummaryComponentResource =
  environment.mode === 'classic'
    ? classicComponentResource
    : fhirComponentResource

export default patientSummaryComponentResource
