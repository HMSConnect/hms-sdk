import React, { useEffect, useRef } from 'react'

import { FormModalContent, useModal } from '@components/base/Modal'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import { noneOption, selectOptions } from '@config'
import { encounterStatusOption } from '@config/patient_embedded_config'
import {
  IEncounterListFilterQuery,
  mergeWithEncounterInitialFilterQuery,
} from '@data-managers/EncounterDataManager'
import { CircularProgress, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { countFilterActive, sendMessage } from '@utils'
import * as _ from 'lodash'
import routes from '../../../routes'
import RouterManager from '../../../routes/RouteManager'
import EncounterService from '../../../services/EncounterService'
import { HMSService } from '../../../services/HMSServiceFactory'
import { IHeaderCellProps } from '../../base/EnhancedTableHead'
import useInfinitScroll from '../../hooks/useInfinitScroll'
import PatientEncounterList from '../../templates/PatientEncounterList'

const useStyles = makeStyles((theme: Theme) => ({
  listRoot: { maxHeight: '60vh', overflow: 'auto' },
  root: {
    justifyContent: 'center',
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

export interface IBodyCellProp {
  align: 'right' | 'left' | 'center'
  id: string
  styles?: any
}

export interface ITableCellProp {
  headCell: IHeaderCellProps
  bodyCell: IBodyCellProp
}

const PatientEncounterTimeline: React.FunctionComponent<{
  patientId: any
  resourceList?: any[]
  isInitialize?: boolean
  max?: number
  initialFilter?: IEncounterListFilterQuery
}> = ({
  patientId,
  resourceList,
  isInitialize,
  max = 20,
  initialFilter: customInitialFilter = {
    patientId,
    periodStart_lt: undefined,
    status: '',
    type: undefined,
  },
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithEncounterInitialFilterQuery(customInitialFilter, {
      patientId,
    })
  }, [customInitialFilter])
  const [filter, setFilter] = React.useState<IEncounterListFilterQuery>(
    initialFilter,
  )

  const [submitedFilter, setSubmitedFilter] = React.useState<
    IEncounterListFilterQuery
  >(initialFilter)

  const classes = useStyles()

  const myscroll = useRef<HTMLDivElement | null>(null)

  const fetchMoreAsync = async (lastEntry: any) => {
    const encounterService = HMSService.getService(
      'encounter',
    ) as EncounterService

    const newFilter: IEncounterListFilterQuery = {
      ...filter,
      periodStart_lt: _.get(lastEntry, 'assertedDate'),
    }
    // setFilter(newFilter)
    const newLazyLoad = {
      filter: {
        ...filter,
        periodStart_lt: _.get(lastEntry, 'startTime'),
      },
      max,
      withOrganization: true,
    }

    const entryData = await encounterService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      sendMessage({
        error: _.get(entryData, 'error'),
      })
      return Promise.reject(new Error(entryData.error))
    }

    sendMessage({
      message: 'handleLoadMore',
      params: newLazyLoad,
    })

    return Promise.resolve(_.get(entryData, 'data'))
  }

  const {
    data,
    error,
    isLoading,
    setIsFetch,
    setIsMore,
    setResult,
    isMore,
  } = useInfinitScroll(null, fetchMoreAsync, resourceList)

  useEffect(() => {
    if (isInitialize) {
      setIsFetch(true)
    }
  }, [isInitialize])

  const handleEncounterSelect = async (
    event: React.MouseEvent,
    selectedEncounter: any,
  ) => {
    const newParams = {
      encounterId: _.get(selectedEncounter, 'id'),
      patientId,
    }
    const path = RouterManager.getPath(
      `patient-info/${patientId}/encounter/${_.get(selectedEncounter, 'id')}`,
      {
        matchBy: 'url',
      },
    )
    sendMessage({
      action: 'PUSH_ROUTE',
      message: 'handleEncounterSelect',
      params: newParams,
      path,
    })
    routes.Router.pushRoute(path, newParams)
  }

  const fetchData = async (filter: any) => {
    setFilter(filter)
    setIsMore(true)
    const encounterService = HMSService.getService(
      'encounter',
    ) as EncounterService
    const newLazyLoad = {
      filter: {
        ...filter,
        periodStart_lt: filter.periodStart_lt || initialFilter.periodStart_lt,
      },
      max,
    }
    const entryData = await encounterService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      sendMessage({
        error: _.get(entryData, 'error'),
      })
      return Promise.reject(new Error(entryData.error))
    }

    sendMessage({
      message: 'handleLoadMore',
      params: filter,
    })
    setResult(entryData)
    closeModal()
  }

  const handleParameterChange = (type: string, value: any) => {
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      [type]: value,
    }))
  }

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    fetchData(filter)
    setSubmitedFilter(filter)
  }

  const handleSearchReset = () => {
    fetchData(initialFilter)
    setSubmitedFilter(initialFilter)
  }

  const { showModal, renderModal, closeModal } = useModal(TableFilterPanel, {
    CustomModal: FormModalContent,
    modalTitle: 'Encouter Filter',
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [
        // {
        //   label: 'Name',
        //   name: 'codeText',
        //   type: 'text',
        // },
        {
          choices: _.concat(
            [noneOption],
            selectOptions.patient.encounterStatusOption,
          ),
          label: 'Status',
          name: 'status',
          type: 'options',
        },
      ],
      onParameterChange: handleParameterChange,
      onSearchSubmit: handleSearchSubmit,
    },
  })

  return (
    <>
      <div className={classes.toolbar}>
        <ToolbarWithFilter
          title={'Encounter'}
          onClickIcon={showModal}
          filterActive={countFilterActive(submitedFilter, initialFilter, [
            'assertedDate_lt',
            'patientId',
          ])}
        >
          {renderModal}
        </ToolbarWithFilter>
      </div>
      <div
        ref={myscroll}
        className={classes.tableWrapper}
        data-testid='scroll-container'
      >
        <PatientEncounterList
          entryList={data}
          onEntrySelected={handleEncounterSelect}
          isLoading={isLoading}
          isMore={isMore}
        />
      </div>

      {error ? <>There Have Error : {error}</> : null}
    </>
  )
}

export default PatientEncounterTimeline
