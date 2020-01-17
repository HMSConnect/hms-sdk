import React from 'react'

import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import { FormModalContent, useModal } from '@components/base/Modal'
import TableBase from '@components/base/TableBase'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { noneOption, selectOptions } from '@config'
import {
  IClaimListFilterQuery,
  mergeWithClaimInitialFilterQuery,
} from '@data-managers/ClaimDataManager'
import { Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ClaimService from '@services/ClaimService'
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

const PatientClaimTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IClaimListFilterQuery
}> = ({
  resourceList,
  patientId,
  max = 20,
  isInitialize,
  initialFilter: customInitialFilter = {
    billablePeriodStart_lt: undefined,
    organizationId: undefined,
    patientId,
    status: '',
  },
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithClaimInitialFilterQuery(customInitialFilter, {
      patientId,
    })
  }, [customInitialFilter])
  const [filter, setFilter] = React.useState<IClaimListFilterQuery>(
    initialFilter,
  )

  const [submitedFilter, setSubmitedFilter] = React.useState<
    IClaimListFilterQuery
  >(initialFilter)

  const fetchMoreAsync = async (lastEntry: any) => {
    const claimService = HMSService.getService('claim') as ClaimService
    const newFilter: IClaimListFilterQuery = {
      ...filter,
      billablePeriodStart_lt: _.get(lastEntry, 'billablePeriodStart'),
      patientId,
    }
    // setFilter(newFilter)
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await claimService.list(newLazyLoad)
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
    const claimService = HMSService.getService('claim') as ClaimService
    const newLazyLoad = {
      filter: {
        ...filter,
        billablePeriodStart_lt:
          filter.billablePeriodStart_lt || initialFilter.billablePeriodStart_lt,
      },
      max,
    }
    const entryData = await claimService.list(newLazyLoad)
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
    modalTitle: 'Claim Filter',
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [
        {
          choices: _.concat(
            [noneOption],
            selectOptions.patient.claimStatusOption,
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

  if (error) {
    return <>Error: {error}</>
  }

  const classes = useStyles()

  return (
    <>
      <div className={classes.toolbar}>
        <ToolbarWithFilter
          title={'Claim'}
          onClickIcon={showModal}
          filterActive={countFilterActive(submitedFilter, initialFilter, [
            'billablePeriodStart_lt',
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
          id='claim'
          entryList={data}
          isLoading={isLoading}
          isMore={isMore}
          data-testid='table-base'
          tableCells={[
            {
              bodyCell: {
                align: 'left',
                id: 'organization.reference',
              },
              headCell: {
                align: 'left',
                disablePadding: false,
                disableSort: true,
                id: 'organization.reference',
                label: 'Name',
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'use',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'use',
                label: 'Use',
                styles: {
                  width: '5em',
                },
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'status',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'status',
                label: 'Status',
                styles: {
                  width: '5em',
                },
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'totalPrice',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'totalPrice',
                label: 'Total Price',
                styles: {
                  width: '10em',
                },
              },
            },

            {
              bodyCell: {
                align: 'center',
                id: 'billablePeriodStartText',
              },
              headCell: {
                align: 'center',
                disablePadding: true,
                disableSort: true,
                id: 'billablePeriodStartText',
                label: 'Billable Period Date',
                styles: {
                  width: '20em',
                },
              },
            },
          ]}
        />
      </div>
    </>
  )
}

export default PatientClaimTable
