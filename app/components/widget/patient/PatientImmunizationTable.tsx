import React from 'react'

import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import { FormModalContent, useModal } from '@components/base/Modal'
import TabGroup, { ITabList } from '@components/base/TabGroup'
import TableBase from '@components/base/TableBase'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { IImmunizationListFilterQuery } from '@data-managers/ImmunizationDataManager'
import { Checkbox, FormControlLabel, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { HMSService } from '@services/HMSServiceFactory'
import ImmunizationService from '@services/ImmunizationService'
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

const PatientImmunizationTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: IImmunizationListFilterQuery
}> = ({
  resourceList,
  patientId,
  max = 20,
  isInitialize,
  initialFilter = {
    date_lt: undefined,
    patientId,
    status: '',
    vaccineCode: undefined,
  },
}) => {
  const [filter, setFilter] = React.useState<IImmunizationListFilterQuery>(
    initialFilter,
  )
  const [submitedFilter, setSubmitedFilter] = React.useState<
    IImmunizationListFilterQuery
  >(initialFilter)

  const fetchMoreAsync = async (lastEntry: any) => {
    const immunizationService = HMSService.getService(
      'immunization',
    ) as ImmunizationService

    const newFilter: IImmunizationListFilterQuery = {
      ...filter,
      date_lt: _.get(lastEntry, 'date'),
      patientId,
    }
    setFilter(newFilter)
    const newLazyLoad = {
      filter: newFilter,
      max,
    }
    const entryData = await immunizationService.list(newLazyLoad)
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
    setResult,
    setIsMore,
    setIsFetch,
  } = useInfinitScroll(null, fetchMoreAsync, resourceList)

  React.useEffect(() => {
    if (isInitialize) {
      setIsFetch(true)
    }
  }, [isInitialize])

  const [isGroup, setIsGroup] = React.useState<boolean | undefined>(false)
  const [tabList, setTabList] = React.useState<ITabList[]>([])

  const handleimmunizationSelect = (
    event: React.MouseEvent,
    selectedEncounter: any,
  ) => {
    // TODO handle select immunization
  }

  const handleGroupByType = async (isGroup: boolean) => {
    const immunizationService = HMSService.getService(
      'immunization',
    ) as ImmunizationService
    if (isGroup) {
      const menuTabList = await immunizationService.typeList({
        filter: { patientId },
      })
      setTabList(menuTabList.data)
      handleTabChange(menuTabList.data[0].type)
    } else {
      const newResult = await immunizationService.list({
        filter: initialFilter,
      })
      setResult(newResult)
    }
    setIsMore(true)
    setIsGroup(isGroup)
  }

  const handleTabChange = async (selectedTab: string) => {
    const filter = {
      date_lt: undefined,
      patientId,
      vaccineCode: selectedTab,
    }
    setFilter(filter)
    setSubmitedFilter(filter)
    const immunizationService = HMSService.getService(
      'immunization',
    ) as ImmunizationService
    const newResult = await immunizationService.list({ filter })
    setResult(newResult)
    setIsMore(true)
  }
  const fetchData = async (filter: any) => {
    setFilter(filter)
    setIsMore(true)
    const immunizationService = HMSService.getService(
      'immunization',
    ) as ImmunizationService
    const newLazyLoad = {
      filter: {
        ...filter,
        date_lt: undefined,
      },
      max,
    }
    const entryData = await immunizationService.list(newLazyLoad)
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
          choices: [
            {
              label: 'Completed',
              value: 'completed',
            },
            {
              label: 'Entered in Error',
              value: 'entered-in-error',
            },
            {
              label: 'Not Done',
              value: 'not-done',
            },
          ],
          label: 'Status',
          name: 'status',
          type: 'options',
        },
      ],
      onParameterChange: handleParameterChange,
      onSearchSubmit: handleSearchSubmit,
    },
  })

  const classes = useStyles()
  if (error) {
    return <>Error: {error}</>
  }

  return (
    <>
      <div className={classes.toolbar}>
        <ToolbarWithFilter
          title={'Immunization'}
          onClickIcon={showModal}
          filterActive={countFilterActive(submitedFilter, initialFilter, [
            'date_lt',
            'patientId',
            'vaccineCode',
          ])}
          option={{
            additionButton: (
              <FormControlLabel
                value='start'
                control={
                  <Checkbox
                    onChange={(event, isGroup) => {
                      handleGroupByType(isGroup)
                    }}
                    data-testid='check-by-type-input'
                    value={isGroup}
                    inputProps={{
                      'aria-label': 'primary checkbox',
                    }}
                  />
                }
                label='Group By Type'
                labelPlacement='start'
              />
            ),
          }}
        >
          {renderModal}
        </ToolbarWithFilter>
        {isGroup && (
          <TabGroup tabList={tabList} onTabChange={handleTabChange} />
        )}
      </div>
      <div
        ref={myscroll}
        className={classes.tableWrapper}
        data-testid='scroll-container'
      >
        <TableBase
          id='immunization'
          entryList={data}
          isLoading={isLoading}
          data-testid='table-base'
          tableCells={[
            {
              bodyCell: {
                align: 'left',
                id: 'vaccineCode',
              },
              headCell: {
                align: 'left',
                disablePadding: true,
                disableSort: true,
                id: 'vaccineCode',
                label: 'Vaccine Code',
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
                id: 'dateText',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'dateText',
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

export default PatientImmunizationTable
