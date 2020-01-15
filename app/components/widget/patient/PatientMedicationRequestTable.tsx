import React from 'react'

import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import { FormModalContent, useModal } from '@components/base/Modal'
import TableBase from '@components/base/TableBase'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { IMedicationRequestFilterQuery } from '@data-managers/MedicationRequestDataManager'
import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { HMSService } from '@services/HMSServiceFactory'
import MedicationRequestService from '@services/MedicationRequestService'
import { sendMessage } from '@utils'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  tableWrapper: {
    maxHeight: '55vh',
    overflow: 'auto',
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
  max,
  initialFilter = {
    authoredOn_lt: undefined,
    medicationCodeableConcept: '',
    patientId,
  },
}) => {
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
    setFilter(newFilter)
    const newLazyLoad = {
      filter: newFilter,
      max: max || 10,
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
  } = useInfinitScroll(myscroll.current, fetchMoreAsync, resourceList)

  React.useEffect(() => {
    if (isInitialize) {
      setIsFetch(true)
    }
  }, [isInitialize])

  const handleMedicationRequestSelect = (
    event: React.MouseEvent,
    selectedEncounter: any,
  ) => {
    // TODO handle select AllergyIntolerance
    // routes.Router.push({
    //   pathname: `/patient-info/encounter/${selectedEncounter.id}`,
    //   query: {
    //     patientId,
    //   },
    // })
  }

  const fetchData = async (filter: any) => {
    setFilter(filter)
    setIsMore(true)
    const medicationRequestService = HMSService.getService(
      'medication_request',
    ) as MedicationRequestService
    const newLazyLoad = {
      filter,
      max: max || 10,
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
    modalTitle: 'Procedure Filter',
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
      ],
      onParameterChange: handleParameterChange,
      onSearchSubmit: handleSearchSubmit,
    },
  })

  const countFilterActive = (
    filter: any,
    initialFilter: any,
    excludeFilter?: any[],
  ) => {
    let filterWithoutExcludeFilter = initialFilter
    if (_.isEmpty(excludeFilter)) {
      filterWithoutExcludeFilter = _.omit(
        filterWithoutExcludeFilter,
        excludeFilter,
      )
    }

    let count = 0
    _.forEach(filter, (value, key) => {
      if (value !== filterWithoutExcludeFilter[key]) {
        count++
      }
    })

    return count
  }

  if (error) {
    return <>Error: {error}</>
  }
  const classes = useStyles()

  return (
    <>
      <ToolbarWithFilter
        title={'Medical Request'}
        onClickIcon={showModal}
        filterActive={countFilterActive(submitedFilter, initialFilter, [
          'patientId',
        ])}
      >
        {renderModal}
      </ToolbarWithFilter>
      <div
        ref={myscroll}
        className={classes.tableWrapper}
        data-testid='scroll-container'
      >
        <TableBase
          id='allergyIntolerance'
          entryList={data}
          isLoading={isLoading}
          data-testid='table-base'
          tableCells={[
            {
              bodyCell: {
                align: 'left',
                id: 'medicationCodeableConcept',
              },
              headCell: {
                align: 'left',
                disablePadding: true,
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
