import * as React from 'react'

import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import {
  IAllergyIntoleranceListFilterQuery,
  mergeWithAllergyIntoleranceInitialFilterQuery,
} from '@data-managers/AllergyIntoleranceDataManager'
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import { HMSService } from '@services/HMSServiceFactory'
import { sendMessage, validQueryParams } from '@utils'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  listPadding: {
    paddingLeft: theme.spacing(1)
  },
  tableWrapper: {
    ['& .MuiTableCell-stickyHeader']: {
      top: 60,
    },
    flex: 1,
  },
  toolbar: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
}))

const PatientAllergyList: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IAllergyIntoleranceListFilterQuery
  isContainer?: boolean
  option?: any
  name?: string
}> = ({
  resourceList,
  patientId,
  max = 20,
  isInitialize,
  isContainer = true,
  initialFilter: customInitialFilter = {
    assertedDate_lt: undefined,
    category: undefined,
    codeText: undefined,
    criticality: '',
    patientId,
    type: '',
  },
  option = {},
  name = 'patientAllergyList',
}) => {
    const initialFilter = React.useMemo(() => {
      return mergeWithAllergyIntoleranceInitialFilterQuery(customInitialFilter, {
        patientId,
      })
    }, [customInitialFilter])

    const classes = useStyles()

    const [filter, setFilter] = React.useState<
      IAllergyIntoleranceListFilterQuery
    >(initialFilter)

    const fetchMoreAsync = async (lastEntry: any) => {
      const allergyIntoleranceService = HMSService.getService(
        'allergy_intolerance',
      ) as AllergyIntoleranceService
      const newFilter: IAllergyIntoleranceListFilterQuery = {
        ...filter,
        assertedDate_lt: _.get(lastEntry, 'assertedDate'),
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
      const entryData = await allergyIntoleranceService.list(newLazyLoad)
      if (_.get(entryData, 'error')) {
        sendMessage({
          error: _.get(entryData, 'error'),
          message: 'handleLoadMore',
          name,
        })
        return Promise.reject(new Error(entryData.error))
      }

      sendMessage({
        message: 'handleLoadMore',
        name,
        params: newLazyLoad,
      })

      return Promise.resolve(_.get(entryData, 'data'))
    }

    const myscroll = React.useRef<HTMLDivElement | null>(null)
    const {
      data,
      error,
      isMore,
      isLoading,
      setIsFetch,
    } = useInfinitScroll(
      isContainer ? myscroll.current : null,
      fetchMoreAsync,
      resourceList,
      { max },
    )

    React.useEffect(() => {
      if (isInitialize) {
        setIsFetch(true)
      }
    }, [isInitialize])

    const renderCriticalIcon = (allergy: any) => {
      switch (allergy.criticality) {
        case 'low':
          return (
            <ListItemIcon style={{ color: '#ff9800' }}>
              <FiberManualRecordIcon />
            </ListItemIcon>
          )
        case 'high':
          return (
            <ListItemIcon style={{ color: '#e57373' }}>
              <FiberManualRecordIcon />
            </ListItemIcon>
          )
        case 'unable-to-assess':
          return (
            <ListItemIcon style={{ color: 'grey' }}>
              <FiberManualRecordIcon />
            </ListItemIcon>
          )
        default:
          return (
            <ListItemIcon>
              <FiberManualRecordIcon />
            </ListItemIcon>
          )
      }
    }

    if (error) {
      return <>Error: {error}</>
    }

    return (
      <div ref={myscroll} style={{ overflow: 'auto', width: '100%', height: '100%' }}>
        <div className={classes.toolbar}>
          <ToolbarWithFilter
            title={'Allergies'}
            option={{
              isHideIcon: true,
            }}
          ></ToolbarWithFilter>
        </div>
        <List className={classes.listPadding} component='nav' aria-labelledby='nested-list-subheader'>
          {_.isEmpty(data) ? (
            <div style={{ padding: '1em', textAlign: 'center' }}>
              <Typography variant='body1'>No allergy found</Typography>
            </div>
          ) : (
              <>
                {_.map(data, (allergy: any, index: number) => (
                  <ListItem key={`allergy${index}`} style={{ padding: '0 0' }}>
                    {renderCriticalIcon(allergy)}
                    <ListItemText primary={`${_.get(allergy, 'codeText')}`} />
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
    )
  }

export default PatientAllergyList