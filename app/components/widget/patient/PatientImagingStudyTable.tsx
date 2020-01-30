import React from 'react'

import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import { FormModalContent, useModal } from '@components/base/Modal'
import TableBase from '@components/base/TableBase'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import {
  IImagingStudyListFilterQuery,
  mergeWithImagingStudyInitialFilterQuery,
} from '@data-managers/ImagingStudyDataManager'
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { HMSService } from '@services/HMSServiceFactory'
import ImagingStudyService from '@services/ImagingStudyService'
import { countFilterActive, sendMessage, validQueryParams } from '@utils'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
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

const PatientImagingStudyTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IImagingStudyListFilterQuery
  name?: string
}> = ({
  resourceList,
  patientId,
  max = 20,
  isInitialize,
  initialFilter: customInitialFilter = {
    patientId,
    started_lt: undefined,
  },
  name = 'patientImagingStudyTable',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithImagingStudyInitialFilterQuery(customInitialFilter, {
      patientId,
    })
  }, [customInitialFilter])
  const [filter, setFilter] = React.useState<IImagingStudyListFilterQuery>(
    initialFilter,
  )

  const [submitedFilter, setSubmitedFilter] = React.useState<
    IImagingStudyListFilterQuery
  >(initialFilter)

  const fetchMoreAsync = async (lastEntry: any) => {
    const imagingStudyService = HMSService.getService(
      'imaging_study',
    ) as ImagingStudyService
    const newFilter: IImagingStudyListFilterQuery = {
      ...filter,
      patientId,
      started_lt: _.get(lastEntry, 'started'),
    }
    // setFilter(newFilter)
    const validParams = validQueryParams(
      { patientId: true },
      { filter: newFilter },
    )
    if (!_.isEmpty(validParams)) {
      return Promise.reject(new Error(_.join(validParams, ', ')))
    }
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await imagingStudyService.list(newLazyLoad)
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
    setIsMore,
    setResult,
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
    const imagingStudyService = HMSService.getService(
      'imaging_study',
    ) as ImagingStudyService
    const newLazyLoad = {
      filter: {
        ...filter,
        started_lt: initialFilter.started_lt,
      },
      max,
    }
    const entryData = await imagingStudyService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      sendMessage({
        error: _.get(entryData, 'error'),
        message: 'handleSearchSubmit',
        name,
      })
      return Promise.reject(new Error(entryData.error))
    }
    return Promise.resolve(entryData)
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
      params: { filter, max },
    })
    closeModal()
  }

  const handleSearchReset = async () => {
    setSubmitedFilter(initialFilter)
    const newData = await fetchData(initialFilter)
    setResult(newData)
    sendMessage({
      message: 'handleSearchReset',
      params: { filter: initialFilter, max },
    })
    closeModal()
  }
  const { showModal, renderModal, closeModal } = useModal(TableFilterPanel, {
    CustomModal: FormModalContent,
    modalTitle: 'Imaging Study Filter',
    name: `${name}Modal`,
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [],
      onParameterChange: handleParameterChange,
      onSearchSubmit: handleSearchSubmit,
    },
  })

  if (error) {
    return <>Error: {error}</>
  }

  const classes = useStyles()
  // if (isLoading) {
  //   return <CircularProgress />
  // }

  return (
    <>
      <div className={classes.toolbar}>
        <ToolbarWithFilter
          title={'Imaging Study'}
          onClickIcon={showModal}
          filterActive={countFilterActive(submitedFilter, initialFilter, [
            'started_lt',
            'patientId',
          ])}
          option={{
            isHideIcon: true,
          }}
        >
          {renderModal}
        </ToolbarWithFilter>
      </div>

      <Grid container>
        <Grid item xs={10}>
          <Typography variant='h6'></Typography>
        </Grid>
      </Grid>
      <div
        ref={myscroll}
        className={classes.tableWrapper}
        data-testid='scroll-container'
      >
        <TableBase
          id='imagingStudy'
          entryList={data}
          isLoading={isLoading}
          isMore={isMore}
          data-testid='table-base'
          size='small'
          tableCells={[
            {
              bodyCell: {
                align: 'center',
                id: 'instance',
                render: (imagingStudy: any) => {
                  return (
                    <ul>
                      {_.map(imagingStudy.series, (serie, index) => (
                        <li key={`instanceTitle${index}`}>
                          {_.get(serie, 'instance[0].title')}
                        </li>
                      ))}
                    </ul>
                  )
                },
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'instance',
                label: 'Instance Title',
                styles: {
                  width: '15em',
                },
              },
            },
            {
              bodyCell: {
                align: 'left',
                id: 'encounter',
              },
              headCell: {
                align: 'left',
                disablePadding: false,
                disableSort: true,
                id: 'encounter',
                label: 'Encounter',
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'startedText',
              },
              headCell: {
                align: 'center',
                disablePadding: true,
                disableSort: true,
                id: 'startedText',
                label: 'Start Date',
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

export default PatientImagingStudyTable
