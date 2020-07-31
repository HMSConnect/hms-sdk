import GridLayoutWithComponentSelector from '@components/base/GridLayoutWithComponentSelector'
import { OBSERVATION_CODE } from '@config/observation'
import patientSummaryComponentResource from '@config/patientSummaryComponentResource'
import { makeStyles } from '@material-ui/core'
import * as _ from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IEnhancedTableProps } from '../../base/EnhancedTableHead'

export interface IPatientTableProps {
  entry: any[]
  headerCells: IEnhancedTableProps[]
  bodyCells: any
}

export interface IPatientTableData {
  tableData: any
  tableNavigate: string
}
const useStyles = makeStyles((theme) => ({
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
    height: '30em',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  laboratoryCardContent: {
    height: '34em',
    margin: theme.spacing(1),
    overflow: 'auto',
  },
  menuList: {
    height: '44em',
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

const componentResource: any = patientSummaryComponentResource
let index = 0
const defaultItems = _.chain(componentResource)
  .omitBy((c) => _.isEmpty(c.defaultPosition))
  .map((c, componentKey) => {
    return {
      componentKey,
      i: `${componentKey}_${index++}`,
      // i: `init_${componentKey}`,
      ...(c?.defaultPosition || { x: 0, y: 9 }),
      ...(c?.layout || {}),
    }
  })
  .value()

export const PatientSummaryWithConnector: React.FunctionComponent<{
  patientId: string
  encounterId: string
  name?: string
}> = ({ patientId, encounterId, name }) => {
  const state = useSelector((state: any) => state.patientSummary)
  return (
    <PatientSummary
      patientId={patientId}
      encounterId={encounterId}
      name={name}
    />
  )
}
const PatientSummary: React.FunctionComponent<{
  patientId: string
  encounterId: string
  name?: string
}> = ({ patientId, encounterId, name = 'patientSummary' }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  React.useEffect(() => {
    dispatch({
      payload: {
        observationBloodPressureCard: {
          encounterId,
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        observationBodyMeasurementCard: {
          encounterId,
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        observationHeartRateCard: {
          encounterId,
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        observationHistoryGraph: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        observationLaboratoryTable: {
          encounterId,
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        observationSummaryGraph: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        observationTemperatureCard: {
          encounterId,
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        observationTobaccoSmokingStatusCard: {
          encounterId,
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientAllergyList: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientAllergySummaryCard: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientCarePlanTable: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientConditionTable: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientDemographic: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientEncounterTimeline: {
          encounterId,
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientImmunizationSummaryCard: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientImmunizationTable: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientMedicationList: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientMedicationSummaryCard: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientPractitioner: {
          encounterId,
          maxDisplay: 2,
          mouseTrackCategory: 'patient_summary',
        },
        patientProcedureTable: {
          mouseTrackCategory: 'patient_summary',
          patientId,
        },
        patientSummaryCards: {
          encounterId,
          mouseTrackCategory: 'patient_summary',
          patientId,
          selectedCard: OBSERVATION_CODE.BLOOD_PRESSURE.value,
        },
      },
      type: 'INIT_PATIENT_SUMMARY',
    })
  }, [patientId, encounterId])

  return (
    <>
      <GridLayoutWithComponentSelector
        componentResource={componentResource}
        defaultItems={defaultItems}
      />
    </>
  )
}

export default PatientSummary
