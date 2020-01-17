import React from 'react'

import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import { FormModalContent, useModal } from '@components/base/Modal'
import TableBase from '@components/base/TableBase'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { noneOption, selectOptions } from '@config'
import {
  IAllergyIntoleranceListFilterQuery,
  mergeWithAllergyIntoleranceInitialFilterQuery,
} from '@data-managers/AllergyIntoleranceDataManager'
import { CircularProgress, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import { HMSService } from '@services/HMSServiceFactory'
import { countFilterActive, sendMessage } from '@utils'
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

const PatientAllergyIntoleranceTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IAllergyIntoleranceListFilterQuery
}> = ({
  resourceList,
  patientId,
  max = 20,
  isInitialize,
  initialFilter: customInitialFilter = {
    assertedDate_lt: undefined,
    category: undefined,
    codeText: undefined,
    criticality: '',
    patientId,
    type: '',
  },
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithAllergyIntoleranceInitialFilterQuery(customInitialFilter, {
      patientId,
    })
  }, [customInitialFilter])
  const [filter, setFilter] = React.useState<
    IAllergyIntoleranceListFilterQuery
  >(initialFilter)

  const [submitedFilter, setSubmitedFilter] = React.useState<
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
    setFilter(newFilter)
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await allergyIntoleranceService.list(newLazyLoad)
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
    const allergyIntoleranceService = HMSService.getService(
      'allergy_intolerance',
    ) as AllergyIntoleranceService
    const newLazyLoad = {
      filter: {
        ...filter,
        assertedDate_lt:
          filter.assertedDate_lt || initialFilter.assertedDate_lt,
      },
      max,
    }
    const entryData = await allergyIntoleranceService.list(newLazyLoad)
    if (_.get(entryData, 'error')) {
      sendMessage({
        error: _.get(entryData, 'error'),
      })
      return Promise.reject(new Error(entryData.error))
    }

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
    sendMessage({
      message: 'handleSearchSubmit',
      params: { filter, max },
    })
  }

  const handleSearchReset = () => {
    fetchData(initialFilter)
    setSubmitedFilter(initialFilter)
    sendMessage({
      message: 'handleSearchReset',
      params: { filter: initialFilter, max },
    })
  }
  const { showModal, renderModal, closeModal } = useModal(TableFilterPanel, {
    CustomModal: FormModalContent,
    modalTitle: 'Procedure Filter',
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
            selectOptions.patient.allergyIntoleranceTypeOption,
          ),
          label: 'Type',
          name: 'type',
          type: 'options',
        },
        {
          choices: _.concat(
            [noneOption],
            selectOptions.patient.carePlanStatusOption,
          ),
          label: 'Criticality',
          name: 'criticality',
          type: 'options',
        },
      ],
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
          title={'Allergy Intolerance'}
          onClickIcon={showModal}
          filterActive={countFilterActive(submitedFilter, initialFilter, [
            'assertedDate_lt',
            'patientId',
          ])}
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
          id='allergyIntolerance'
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
                label: 'Name',
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'type',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'type',
                label: 'Type',
                styles: {
                  width: '5em',
                },
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'criticality',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'criticality',
                label: 'Criticality',
                styles: {
                  width: '5em',
                },
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'category',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'category',
                label: 'Category',
                styles: {
                  width: '10em',
                },
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'assertedDateText',
              },
              headCell: {
                align: 'center',
                disablePadding: true,
                disableSort: true,
                id: 'assertedDateText',
                label: 'Asserted Date',
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

export default PatientAllergyIntoleranceTable
