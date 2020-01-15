import React from 'react'

import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import TabGroup, { ITabList } from '@components/base/TabGroup'
import TableBase from '@components/base/TableBase'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { IImmunizationListFilterQuery } from '@data-managers/ImmunizationDataManager'
import { Checkbox, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { HMSService } from '@services/HMSServiceFactory'
import ImmunizationService from '@services/ImmunizationService'
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

const PatientImmunizationTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
}> = ({ resourceList, patientId, max, isInitialize }) => {
  const [filter, setFilter] = React.useState<IImmunizationListFilterQuery>({
    date_lt: undefined,
    patientId,
    vaccineCode: undefined,
  })

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
      max: max || 10,
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
  } = useInfinitScroll(myscroll.current, fetchMoreAsync, resourceList)

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
      const filter = resetFilter()
      const newResult = await immunizationService.list({ filter })
      setResult(newResult)
    }
    setIsMore(true)
    setIsGroup(isGroup)
  }

  const resetFilter = () => {
    const filter = {
      date_lt: undefined,
      patientId,
      vaccineCode: undefined,
    }
    setFilter(filter)
    return filter
  }

  const handleTabChange = async (selectedTab: string) => {
    const filter = {
      date_lt: undefined,
      patientId,
      vaccineCode: selectedTab,
    }
    setFilter(filter)
    const immunizationService = HMSService.getService(
      'immunization',
    ) as ImmunizationService
    const newResult = await immunizationService.list({ filter })
    setResult(newResult)
    setIsMore(true)
  }

  const classes = useStyles()
  if (error) {
    return <>Error: {error}</>
  }

  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant='h6'>Immunization</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='body2'>
            Group By Type
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
          </Typography>
        </Grid>
      </Grid>
      {isGroup && <TabGroup tabList={tabList} onTabChange={handleTabChange} />}
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
