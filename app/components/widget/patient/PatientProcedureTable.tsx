import React from 'react'

import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import ErrorSection from '@components/base/ErrorSection'
import { FormModalContent, useModal } from '@components/base/Modal'
import TableBase from '@components/base/TableBase'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import {
  IProcedureListFilterQuery,
  mergeWithProcedureInitialFilterQuery,
} from '@data-managers/ProcedureDataManager'
import { makeStyles, Theme } from '@material-ui/core'
import { HMSService } from '@services/HMSServiceFactory'
import ProcedureService from '@services/ProcedureService'
import { countFilterActive, sendMessage, validQueryParams } from '@utils'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
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

const PatientProcedureTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IProcedureListFilterQuery
  name?: string
}> = ({
  resourceList,
  patientId,
  isInitialize,
  max = 20,
  initialFilter: customInitialFilter = {
    code: '',
    patientId,
    periodStart_lt: undefined,
  },
  name = 'patientProcedureTable',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithProcedureInitialFilterQuery(customInitialFilter, {
      patientId,
    })
  }, [customInitialFilter])
  const [filter, setFilter] = React.useState<IProcedureListFilterQuery>(
    initialFilter,
  )
  const [submitedFilter, setSubmitedFilter] = React.useState<
    IProcedureListFilterQuery
  >(initialFilter)
  const classes = useStyles()

  const fetchMoreAsync = async (lastEntry: any) => {
    const procedureService = HMSService.getService(
      'procedure',
    ) as ProcedureService

    const newFilter: IProcedureListFilterQuery = {
      ...filter,
      patientId,
      periodStart_lt: _.get(lastEntry, 'performedPeriodStart'),
    }
    // setFilter(newFilter)
    const validParams = validQueryParams(['patientId'], newFilter)
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await procedureService.list(newLazyLoad)
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
    isLoading,
    setIsFetch,
    setResult,
    setIsMore,
    isMore,
  } = useInfinitScroll(null, fetchMoreAsync, resourceList)
  React.useEffect(() => {
    if (isInitialize) {
      setIsFetch(true)
    }
  }, [isInitialize])

  const fetchData = async (filter: any) => {
    setFilter(filter)
    setIsMore(true)
    const procedureService = HMSService.getService(
      'procedure',
    ) as ProcedureService
    const newLazyLoad = {
      filter: {
        ...filter,
        periodStart_lt: initialFilter.periodStart_lt,
      },
      max,
    }
    const entryData = await procedureService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      sendMessage({
        error: _.get(entryData, 'error'),
        message: 'handleSearchSubmit',
        name,
      })
      return Promise.reject(new Error(entryData.error))
    }
    return Promise.resolve(entryData)
    setResult(entryData)
    closeModal()
  }

  const handleParameterChange = (type: string, value: any) => {
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      [type]: value,
    }))
  }

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitedFilter(filter)
    const newData = await fetchData(filter)
    setResult(newData)
    sendMessage({
      message: 'handleSearchSubmit',
      name,
      params: filter,
    })
    closeModal()
  }

  const handleSearchReset = async () => {
    setSubmitedFilter(initialFilter)
    const newData = await fetchData(initialFilter)
    setResult(newData)
    sendMessage({
      message: 'handleSearchReset',
      name,
      params: filter,
    })
    closeModal()
  }

  const { showModal, renderModal, closeModal } = useModal(TableFilterPanel, {
    CustomModal: FormModalContent,
    modalTitle: 'Procedure Filter',
    name: `${name}Modal`,
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [{ type: 'text', name: 'code', label: 'Code' }],
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
          title={'Procedure'}
          onClickIcon={showModal}
          filterActive={countFilterActive(submitedFilter, initialFilter, [
            'patientId',
            'periodStart_lt',
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
          id='procedure'
          entryList={data}
          isLoading={isLoading}
          isMore={isMore}
          data-testid='table-base'
          tableCells={[
            {
              bodyCell: {
                align: 'left',
                id: 'code',
              },
              headCell: {
                align: 'left',
                disablePadding: false,
                disableSort: true,
                id: 'code',
                label: 'Code',
                styles: {
                  width: '5em',
                },
              },
            },
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
                label: 'Detail',
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'performedPeriodStartText',
              },
              headCell: {
                align: 'center',
                disablePadding: true,
                disableSort: true,
                id: 'performedPeriodStartText',
                label: 'Date',
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

export default PatientProcedureTable
