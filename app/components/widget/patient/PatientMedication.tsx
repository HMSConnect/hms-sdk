import * as React from 'react'

import {
  initialPatientMedicationListStructure,
  IPatientMedicationListStructure,
} from '@app/reducers-redux/patient/patientMedicationList.reducer'
import ErrorSection from '@components/base/ErrorSection'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import {
  IMedicationRequestFilterQuery,
  mergeWithMedicationRequestInitialFilterQuery,
} from '@data-managers/MedicationRequestDataManager'
import {
  CircularProgress,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { HMSService } from '@services/HMSServiceFactory'
import MedicationRequestService from '@services/MedicationRequestService'
import { sendMessage, validQueryParams } from '@utils'
import * as _ from 'lodash'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) => ({
  headerCard: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette?.septenary?.dark
        : theme.palette?.septenary?.light,
    color: theme.palette.septenary?.main || '',
  },
  listPadding: {
    paddingLeft: theme.spacing(1),
  },
  tableWrapper: {
    ['& .MuiTableCell-stickyHeader']: {
      top: 30,
    },
    flex: 1,
  },
  toolbar: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
}))

export const PatientMedicationListWithConnector: React.FunctionComponent<{
  patientId?: string
  max?: number
  isInitialize?: boolean
  initialFilter?: IMedicationRequestFilterQuery
  isContainer?: boolean
  name?: string
}> = ({ patientId, max, isInitialize, initialFilter, isContainer, name }) => {
  const patientMedicationListState = useSelector(
    (state: any) => state.patientMedicationList,
  )
  return (
    <PatientMedicationList
      patientId={patientId || _.get(patientMedicationListState, 'patientId')}
      mouseTrackCategory={_.get(
        patientMedicationListState,
        'mouseTrackCategory',
      )}
      isInitialize={isInitialize || true}
      max={max}
      initialFilter={initialFilter}
      isContainer={isContainer}
      name={name}
      structure={patientMedicationListState.structure}
    />
  )
}

const PatientMedicationList: React.FunctionComponent<{
  patientId: any
  structure?: IPatientMedicationListStructure
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IMedicationRequestFilterQuery
  isContainer?: boolean
  name?: string
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  resourceList,
  patientId,
  structure = initialPatientMedicationListStructure,
  max = 20,
  isInitialize,
  isContainer = true,
  initialFilter: customInitialFilter = {
    authoredOn_lt: undefined,
    medicationCodeableConcept: '',
    patientId,
    status: '',
  },
  name = 'patientMedication',
  mouseTrackCategory = 'patient_medication',
  mouseTrackLabel = 'patient_medication',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithMedicationRequestInitialFilterQuery(customInitialFilter, {
      patientId,
    })
  }, [customInitialFilter])
  const [filter, setFilter] = React.useState<IMedicationRequestFilterQuery>(
    initialFilter,
  )

  const classes = useStyles()

  const fetchMoreAsync = async (lastEntry: any) => {
    const medicationRequestService = HMSService.getService(
      'medication_request',
    ) as MedicationRequestService
    const newFilter: IMedicationRequestFilterQuery = {
      ...filter,
      authoredOn_lt: _.get(lastEntry, 'authoredOn'),
      patientId,
    }
    const validParams = validQueryParams(['patientId'], newFilter)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await medicationRequestService.list(newLazyLoad)
    // if (_.get(entryData, 'error')) {
    //   sendMessage({
    //     error: _.get(entryData, 'error'),
    //     message: 'handleLoadMore',
    //     name,
    //   })
    //   return Promise.reject(new Error(entryData.error))
    // }

    sendMessage({
      message: 'handleLoadMore',
      name,
      params: newLazyLoad,
    })

    return Promise.resolve(_.get(entryData, 'data'))
  }

  const myscroll = React.useRef<HTMLDivElement | null>(null)
  const { data, error, isLoading, setIsFetch, isMore } = useInfinitScroll(
    isContainer ? myscroll.current : null,
    fetchMoreAsync,
    resourceList,
  )

  React.useEffect(() => {
    if (isInitialize) {
      setIsFetch(true)
    }
  }, [isInitialize])

  if (error) {
    return <ErrorSection error={error} />
  }

  return (
    <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
      <div
        ref={myscroll}
        style={{ overflow: 'auto', width: '100%', height: '100%' }}
      >
        <div className={classes.toolbar}>
          <ToolbarWithFilter
            title={'Medication Request'}
            Icon={
              structure.headerIconField ? (
                <Icon className='fas fa-pills' />
              ) : null
            }
            option={{
              headerClass: classes.headerCard,
              isHideIcon: true,
            }}
          ></ToolbarWithFilter>
        </div>

        <List
          className={classes.listPadding}
          component='nav'
          aria-labelledby='nested-list-subheader'
        >
          {_.isEmpty(data) ? (
            <div style={{ padding: '1em', textAlign: 'center' }}>
              <Typography variant='body1'>No Medcation found</Typography>
            </div>
          ) : (
            <>
              {_.map(data, (medication: any, index: number) => (
                <ListItem key={`medication${index}`} style={{ padding: '0 0' }}>
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant='body1'>
                        {_.get(medication, 'medicationCodeableConcept')}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
              {isMore ? (
                <ListItem>
                  <ListItemText style={{ textAlign: 'center' }}>
                    {isLoading ? <CircularProgress /> : null}
                  </ListItemText>
                </ListItem>
              ) : null}
            </>
          )}
        </List>
      </div>
    </TrackerMouseClick>
  )
}

export default PatientMedicationList
