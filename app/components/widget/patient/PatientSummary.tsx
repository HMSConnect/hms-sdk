import GridLayoutWithComponentSelector from '@components/base/GridLayoutWithComponentSelector'
import { makeStyles } from '@material-ui/core'
import * as _ from 'lodash'
import React from 'react'
import { useDispatch } from 'react-redux'
import { IEnhancedTableProps } from '../../base/EnhancedTableHead'
import { ObservationHistoryGraphWithConnector } from '../observation/ObservationHistoryGraph'
import { ObservationLaboratoryTableWithConnector } from '../observation/ObservationLaboratoryTable'
import { ObservationSummaryGraphWithConnector } from '../observation/ObservationSummaryGraph'
import { PatientDemographicWithConnector } from './PatientDemographic'
import { PatientEncounterTimelineWithConnector } from './PatientEncounterTimeline'
import { PatientMedicationListWithConnector } from './PatientMedication'
import { PatientSummaryCardsWithConnector } from './PatientSummaryCards'

export interface IPatientTableProps {
  entry: any[]
  headerCells: IEnhancedTableProps[]
  bodyCells: any
}

export interface IPatientTableData {
  tableData: any
  tableNavigate: string
}
const useStyles = makeStyles(theme => ({
  associatedPatientCard: {
    flex: 1,
    height: '15em',
    margin: theme.spacing(1),
    marginTop: 0,
    overflow: 'auto',
    paddingBottom: '1em',
  },
  detailSelector: {
    flex: 1,
  },
  infoPanel: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  laboratoryCardContent: {
    height: '34em',
    margin: theme.spacing(1),
    overflow: 'auto',
  },
  menuList: {
    height: '42em',
    margin: theme.spacing(1),
    overflow: 'auto',
    top: 0,
  },
  patientContent: {
    flex: 1,
    height: '100',
    margin: theme.spacing(1),
  },
  root: { height: '100%', display: 'flex' },
  virtalSignCard: {
    flex: 1,
    margin: theme.spacing(1),
    overflow: 'auto',
  },
}))

const componentResource: any = {
  patientDemographic: {
    component: PatientDemographicWithConnector,
    defaultPosition: { x: 0, y: 0 },
    layout: { h: 4, w: 9, isCard: true },
  },
  patientEncounterTimeline: {
    component: PatientEncounterTimelineWithConnector,
    defaultPosition: { x: 0, y: 4 },
    layout: { h: 12, w: 4, isCard: true },
  },

  patientMedicationList: {
    component: PatientMedicationListWithConnector,
    defaultPosition: { x: 9, y: 0 },
    layout: { h: 4, w: 3, isCard: true },
  },
  patientSummaryCards: {
    component: PatientSummaryCardsWithConnector,
    defaultPosition: { x: 4, y: 4 },
    layout: { h: 12, w: 4, isCard: false },
  },

  observationLaboratoryTable: {
    component: ObservationLaboratoryTableWithConnector,
    defaultPosition: { x: 0, y: 12 },
    layout: { h: 9, w: 8, isCard: true },
  },
  observaionHistoryGraph: {
    component: ObservationHistoryGraphWithConnector,
    defaultPosition: { x: 8, y: 4 },
    layout: { h: 12, w: 4, isCard: true },
  },
  observationSummaryGraph: {
    component: ObservationSummaryGraphWithConnector,
    defaultPosition: { x: 8, y: 12 },
    layout: { h: 9, w: 4, isCard: true },
  },
}

const defaultItems = _.map(componentResource, (c, componentKey) => {
  return {
    componentKey,
    i: `init_${componentKey}`,
    ...(c?.defaultPosition || { x: 0, y: 9 }),
    ...(c?.layout || {}),
  }
})

const PatientSummary: React.FunctionComponent<{
  query: any
  name?: string
}> = ({ query, name = 'patientSummary' }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  React.useEffect(() => {
    dispatch({
      payload: {
        observationHistoryGraph: { query },
        observationLaboratoryTable: { ...query },
        observationSummaryGraph: { query },
        patientDemographic: { patientId: query.patientId },
        patientEncounterTimeline: { query },
        patientMedicationList: { patientId: query.patientId },
        patientSummaryCards: { query },
      },
      type: 'INIT_PATIENT_SUMMARY',
    })
  }, [query])

  return (
    <GridLayoutWithComponentSelector
      componentResource={componentResource}
      defaultItems={defaultItems}
    />
  )
}

export default PatientSummary
