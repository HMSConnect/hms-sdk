import React from 'react'

import {
  tableWithFilterReducer,
  tableWithFilterState,
} from '@app/reducers/tableWithFilter.reducer'
import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import ErrorSection from '@components/base/ErrorSection'
import { FormModalContent, useModal } from '@components/base/Modal'
import TableBase from '@components/base/TableBase'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { noneOption, selectOptions } from '@config'
import {
  IConditionListFilterQuery,
  mergeWithConditionInitialFilterQuery,
} from '@data-managers/ConditionDataManager'
import { makeStyles, Theme } from '@material-ui/core'
import ConditionService from '@services/ConditionService'
import { HMSService } from '@services/HMSServiceFactory'
import { countFilterActive, sendMessage, validQueryParams } from '@utils'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
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

export interface IBodyCellProp {
  align: 'right' | 'left' | 'center'
  id: string
  styles?: any
}

export interface ITableCellProp {
  headCell: IHeaderCellProps
  bodyCell: IBodyCellProp
}

const PatientConditionTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IConditionListFilterQuery
  name?: string
}> = ({
  resourceList,
  patientId,
  max = 20,
  isInitialize,
  initialFilter: customInitialFilter = {},
  name = 'patientConditionTable',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithConditionInitialFilterQuery(customInitialFilter, {
      patientId,
    })
  }, [customInitialFilter])
  const [{ filter, submitedFilter }, dispatch] = React.useReducer(
    tableWithFilterReducer,
    tableWithFilterState,
  )

  React.useEffect(() => {
    dispatch({ type: 'INIT_FILTER', payload: initialFilter })
  }, [])
  const classes = useStyles()

  const fetchData = async (
    newFilter: IConditionListFilterQuery,
    max: number,
  ) => {
    const conditionService = HMSService.getService(
      'condition',
    ) as ConditionService
    const validParams = validQueryParams(['patientId'], newFilter)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await conditionService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      return Promise.reject(new Error(entryData.error))
    }
    return Promise.resolve(_.get(entryData, 'data'))
  }

  const fetchMoreAsync = async (lastEntry: any) => {
    const newFilter: IConditionListFilterQuery = {
      ...filter,
      onsetDateTime_lt: _.get(lastEntry, 'onsetDateTime'),
      patientId,
    }
    const entryData = await fetchData(newFilter, max)
    return entryData
  }

  const myscroll = React.useRef<HTMLDivElement | null>(null)

  const {
    data,
    error,
    isLoading,
    setIsFetch,
    setIsMore,
    setResult,
    isMore,
  } = useInfinitScroll(null, fetchMoreAsync, resourceList)

  React.useEffect(() => {
    if (isInitialize) {
      setIsFetch(true)
    }
  }, [isInitialize])

  const submitSearch = async (filter: any) => {
    dispatch({ type: 'SUBMIT_SEARCH', payload: filter })
    setIsMore(true)
    const newFilter = {
      ...filter,
      onsetDateTime_lt: initialFilter.onsetDateTime_lt,
    }
    const entryData = await fetchData(newFilter, max)
    return entryData
  }

  const handleParameterChange = (type: string, value: any) => {
    dispatch({ type: 'FILTER_ON_CHANGE', payload: { [type]: value } })
  }

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const newData = await submitSearch(filter)
      setResult({ data: newData, error: null })
      sendMessage({
        message: 'handleSearchSubmit',
        name,
        params: filter,
      })
    } catch (error) {
      setResult({ data: [], error })
      sendMessage({
        message: 'handleSearchSubmit',
        name,
        params: filter,
      })
    } finally {
      closeModal()
    }
  }

  const handleSearchReset = async () => {
    try {
      const newData = await submitSearch(initialFilter)
      setResult({ data: newData, error: null })
      sendMessage({
        message: 'handleSearchReset',
        name,
        params: filter,
      })
    } catch (error) {
      setResult({ data: [], error })
      sendMessage({
        message: 'handleSearchReset',
        name,
        params: filter,
      })
    } finally {
      closeModal()
    }
  }

  const { showModal, renderModal, closeModal } = useModal(TableFilterPanel, {
    CustomModal: FormModalContent,
    modalTitle: 'Condition Filter',
    name: `${name}Modal`,
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [
        {
          label: 'Name',
          name: 'codeText',
          type: 'text',
        },
        {
          choices: _.concat(
            [noneOption],
            selectOptions.patient.conditionClinicalStatusOption,
          ),
          label: 'Clinical Status',
          name: 'clinicalStatus',
          type: 'options',
        },
        {
          choices: _.concat(
            [noneOption],
            selectOptions.patient.conditionVerificationStatusOption,
          ),
          label: 'Verification Status',
          name: 'verificationStatus',
          type: 'options',
        },
      ],
      onParameterChange: handleParameterChange,
      onSearchSubmit: handleSearchSubmit,
    },
  })

  if (error) {
    return <ErrorSection error={error} />
  }

  return (
    <>
      <div className={classes.toolbar}>
        <ToolbarWithFilter
          title={'Condition'}
          onClickIcon={showModal}
          filterActive={countFilterActive(submitedFilter, initialFilter, [
            'onsetDateTime_lt',
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
        <TableBase
          id='condition'
          entryList={data}
          isLoading={isLoading}
          isMore={isMore}
          data-testid='table-base'
          tableCells={[
            {
              bodyCell: {
                align: 'left',
                id: 'codeText',
              },
              headCell: {
                align: 'left',
                disablePadding: false,
                disableSort: true,
                id: 'codeText',
                label: 'Condition',
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'clinicalStatus',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'clinicalStatus',
                label: 'ClinicalStatus',
                styles: {
                  width: '5em',
                },
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'verificationStatus',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'verificationStatus',
                label: 'VerificationStatus',
                styles: {
                  width: '5em',
                },
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'onset',
              },
              headCell: {
                align: 'center',
                disablePadding: true,
                disableSort: true,
                id: 'onset',
                label: 'Onset Date',
                styles: {
                  width: '15em',
                },
              },
            },
          ]}
        />
      </div>
    </>
  )
}

export default PatientConditionTable
