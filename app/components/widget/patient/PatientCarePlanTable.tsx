import React from 'react'

import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import ErrorSection from '@components/base/ErrorSection'
import { FormModalContent, useModal } from '@components/base/Modal'
import TabGroup, { ITabList } from '@components/base/TabGroup'
import TableBase from '@components/base/TableBase'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { noneOption, selectOptions } from '@config'
import {
  ICarePlanListFilterQuery,
  mergeWithCarePlanInitialFilterQuery,
} from '@data-managers/CarePlanDataManager'
import {
  Checkbox,
  FormControlLabel,
  makeStyles,
  Theme,
} from '@material-ui/core'
import CarePlanService from '@services/CarePlanService'
import { HMSService } from '@services/HMSServiceFactory'
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

const PatientCarePlanTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
  initialFilter?: ICarePlanListFilterQuery
  name?: string
}> = ({
  resourceList,
  patientId,
  max = 20,
  isInitialize,
  initialFilter: customInitialFilter = {
    category: '',
    patientId,
    periodStart_lt: undefined,
    status: '',
  },
  name = 'patientCarePlanTable',
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithCarePlanInitialFilterQuery(customInitialFilter, {
      patientId,
    })
  }, [customInitialFilter])
  const [filter, setFilter] = React.useState<ICarePlanListFilterQuery>(
    initialFilter,
  )
  const [submitedFilter, setSubmitedFilter] = React.useState<
    ICarePlanListFilterQuery
  >(initialFilter)
  const classes = useStyles()
  const fetchMoreAsync = async (lastEntry: any) => {
    const carePlanService = HMSService.getService(
      'care_plan',
    ) as CarePlanService

    const newFilter: ICarePlanListFilterQuery = {
      ...filter,
      patientId,
      periodStart_lt: _.get(lastEntry, 'periodStart'),
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
    const entryData = await carePlanService.list(newLazyLoad)
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
    setResult,
    setIsMore,
    setIsFetch,
    isMore,
  } = useInfinitScroll(null, fetchMoreAsync, resourceList)

  React.useEffect(() => {
    if (isInitialize) {
      setIsFetch(true)
    }
  }, [isInitialize])

  const [isGroup, setIsGroup] = React.useState<boolean | undefined>(false)
  const [tabList, setTabList] = React.useState<ITabList[]>([])

  const handleGroupByType = async (isGroup: boolean) => {
    const carePlanService = HMSService.getService(
      'care_plan',
    ) as CarePlanService
    if (isGroup) {
      const menuTabList = await carePlanService.categoryList({
        filter: { patientId },
      })
      setTabList(menuTabList.data)
      handleTabChange(menuTabList.data[0].type)
      sendMessage({
        message: 'handleGroupByCategory',
        name,
        params: {
          isGroup,
        },
      })
    } else {
      const newFilter = {
        ...filter,
        category: undefined,
        periodStart_lt: undefined,
      }
      const newResult = await carePlanService.list({
        filter: newFilter,
        max,
      })
      setResult(newResult)
      sendMessage({
        message: 'handleGroupByCategory',
        name,
        params: {
          isGroup,
          result: newResult,
        },
      })
    }
    setIsMore(true)
    setIsGroup(isGroup)
  }

  const handleTabChange = async (selectedTab: string) => {
    const newFilter = {
      ...filter,
      category: selectedTab,
      patientId,
      periodStart_lt: undefined,
    }
    setFilter(newFilter)
    setSubmitedFilter(newFilter)
    const carePlanService = HMSService.getService(
      'care_plan',
    ) as CarePlanService
    const newResult = await carePlanService.list({ filter: newFilter, max })
    setResult(newResult)
    setIsMore(true)

    sendMessage({
      message: `handleTabChange:`,
      name,
      params: {
        filter: newFilter,
        result: newResult,
        tabTitle: selectedTab,
      },
    })
  }

  const fetchData = async (filter: any) => {
    setFilter(filter)
    setIsMore(true)
    const carePlanService = HMSService.getService(
      'care_plan',
    ) as CarePlanService
    const newLazyLoad = {
      filter: {
        ...filter,
        periodStart_lt: initialFilter.periodStart_lt,
      },
      max,
    }
    const entryData = await carePlanService.list(newLazyLoad)
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
    modalTitle: 'Care Plan Filter',
    name: `${name}Modal`,
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
            selectOptions.patient.carePlanStatusOption,
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
    return <ErrorSection error={error} />
  }

  return (
    <>
      <div className={classes.toolbar}>
        <ToolbarWithFilter
          title={'Care Plan'}
          onClickIcon={showModal}
          filterActive={countFilterActive(submitedFilter, initialFilter, [
            'periodStart_lt',
            'patientId',
            'category',
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
                label='Group By Category'
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
          id='carePlan'
          entryList={data}
          isLoading={isLoading}
          isMore={isMore}
          data-testid='table-base'
          size='small'
          tableCells={[
            {
              bodyCell: {
                align: 'left',
                id: 'activity',
                render: (carePlan: any) => {
                  return (
                    <ul>
                      {_.map(carePlan.activity, (activity: any, index) => (
                        <li key={`list${index}`}>
                          {_.get(activity, 'detail.code.text') || 'Unknow'} (
                          {_.get(activity, 'detail.status') || 'Unknkow'})
                        </li>
                      ))}
                    </ul>
                  )
                },
              },
              headCell: {
                align: 'left',
                disablePadding: false,
                disableSort: true,
                id: 'activity',
                label: 'Activity',
              },
            },
            {
              bodyCell: {
                align: 'left',
                id: 'category',
              },
              headCell: {
                align: 'left',
                disablePadding: false,
                disableSort: true,
                id: 'category',
                label: 'Category',
                styles: {
                  width: '15em',
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
                id: 'periodStartText',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'periodStartText',
                label: 'Period Start',
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

export default PatientCarePlanTable
