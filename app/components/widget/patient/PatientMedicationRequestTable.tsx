import React from 'react'

import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import { FormModalContent, useModal } from '@components/base/Modal'
import TableBase from '@components/base/TableBase'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { noneOption, selectOptions } from '@config'
import {
  IMedicationRequestFilterQuery,
  mergeWithMedicationRequestInitialFilterQuery,
} from '@data-managers/MedicationRequestDataManager'
import { makeStyles, Theme } from '@material-ui/core'
import { HMSService } from '@services/HMSServiceFactory'
import MedicationRequestService from '@services/MedicationRequestService'
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

const PatientMedicationRequestTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IMedicationRequestFilterQuery
}> = ({
  resourceList,
  patientId,
  isInitialize,
  max = 20,
  initialFilter: customInitialFilter = {
    authoredOn_lt: undefined,
    medicationCodeableConcept: '',
    patientId,
    status: '',
  },
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithMedicationRequestInitialFilterQuery(customInitialFilter, {
      patientId,
    })
  }, [customInitialFilter])
  const [filter, setFilter] = React.useState<IMedicationRequestFilterQuery>(
    initialFilter,
  )
  const [submitedFilter, setSubmitedFilter] = React.useState<
    IMedicationRequestFilterQuery
  >(initialFilter)
  const fetchMoreAsync = async (lastEntry: any) => {
    const medicationRequestService = HMSService.getService(
      'medication_request',
    ) as MedicationRequestService
    const newFilter: IMedicationRequestFilterQuery = {
      ...filter,
      authoredOn_lt: _.get(lastEntry, 'authoredOn'),
      patientId,
    }
    // setFilter(newFilter)
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await medicationRequestService.list(newLazyLoad)
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
    const medicationRequestService = HMSService.getService(
      'medication_request',
    ) as MedicationRequestService
    const newLazyLoad = {
      filter: {
        ...filter,
        authoredOn_lt: filter.authoredOn_lt || initialFilter.authoredOn_lt,
      },
      max,
    }
    const entryData = await medicationRequestService.list(newLazyLoad)
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
    modalTitle: 'Medication Request Filter',
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [
        {
          label: 'Medication',
          name: 'medicationCodeableConcept',
          type: 'text',
        },
        {
          choices: _.concat(
            [noneOption],
            selectOptions.patient.medicationRequestStatusOption,
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
          title={'Medical Request'}
          onClickIcon={showModal}
          filterActive={countFilterActive(submitedFilter, initialFilter, [
            'patientId',
            'authoredOn_lt',
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
          id='allergyIntolerance'
          entryList={data}
          isLoading={isLoading}
          isMore={isMore}
          data-testid='table-base'
          tableCells={[
            {
              bodyCell: {
                align: 'left',
                id: 'medicationCodeableConcept',
              },
              headCell: {
                align: 'left',
                disablePadding: false,
                disableSort: true,
                id: 'medicationCodeableConcept',
                label: 'Medication',
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
                  width: '10em',
                },
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'authoredOnText',
              },
              headCell: {
                align: 'center',
                disablePadding: true,
                disableSort: true,
                id: 'authoredOnText',
                label: 'Authorred On',
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

export default PatientMedicationRequestTable
