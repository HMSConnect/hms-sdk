import React, { useState } from 'react'

import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import TabGroup, { ITabList } from '@components/base/TabGroup'
import TableBase from '@components/base/TableBase'
import { ILazyLoadOption } from '@components/hooks/useInfinitScroll'
import useLazyLoad from '@components/hooks/useLazyLoad'
import environment from '@environment'
import { Checkbox, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import EncounterService from '@services/EncounterService'
import { HMSService } from '@services/HMSServiceFactory'
import * as _ from 'lodash'
import * as moment from 'moment'
import { useRouter } from 'next/router'

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

const PatientEncounterTable: React.FunctionComponent<{
  resourceList: any[]
  patient: any
}> = ({ resourceList, patient }) => {
  const classes = useStyles()
  const router = useRouter()
  const [lazyLoadOption, setLazyLoad] = useState<ILazyLoadOption>({
    filter: {
      patientId: _.get(patient, 'identifier.id.value'),
    },
    max: 10,
  })

  const {
    data,
    isLoading,
    setResult,
    isMore,
    setIsMore,
    setIsFetch,
  } = useLazyLoad(resourceList, fetchMoreAsync)
  const [isGroup, setIsGroup] = useState<boolean | undefined>(false)
  const [tabList, setTabList] = useState<ITabList[]>([])

  async function fetchMoreAsync() {
    const encounterService = HMSService.getService(
      'encounter',
    ) as EncounterService

    const entryData = await encounterService.list(lazyLoadOption)

    if (_.get(entryData, 'error')) {
      return Promise.reject(new Error(entryData.error))
    }

    return Promise.resolve(_.get(entryData, 'data'))
  }

  const handleEncounterSelect = (
    event: React.MouseEvent,
    selectedEncounter: any,
  ) => {
    router.push({
      pathname: `/patient-info/encounter/${selectedEncounter.id}`,
      query: {
        patientId: _.get(patient, 'identifier.id.value'),
      },
    })
    // TODO handle select encounter
  }

  const handleGroupByType = async (isGroup: boolean) => {
    const encounterService = HMSService.getService(
      'encounter',
    ) as EncounterService
    if (isGroup) {
      const menuTabList = await encounterService.typeList({
        filter: { patientId: lazyLoadOption.filter.patientId },
      })
      setTabList(menuTabList.data)
      handleTabChange(menuTabList.data[0].type)
    } else {
      const filter = resetFilter()
      const newResult = await encounterService.list({ filter })
      setResult(newResult)
    }
    setIsMore(true)
    setIsGroup(isGroup)
  }

  const resetFilter = () => {
    const patientIdFilter = _.get(lazyLoadOption, 'filter.patientId')
    const filter = {
      patientId: patientIdFilter,
      periodStart_lt: undefined,
      type: undefined,
    }
    setLazyLoad(prevLazyLoad => ({
      ...prevLazyLoad,
      filter,
    }))
    return filter
  }

  const handleTabChange = async (selectedTab: string) => {
    const filter = {
      ...lazyLoadOption.filter,
      periodStart_lt: undefined,
      type: selectedTab,
    }
    setLazyLoad(prevLazyLoad => ({
      ...prevLazyLoad,
      filter: {
        ...prevLazyLoad.filter,
        periodStart_lt: undefined,
        type: selectedTab,
      },
    }))
    const encounterService = HMSService.getService(
      'encounter',
    ) as EncounterService
    const newResult = await encounterService.list({ filter })
    setResult(newResult)
    setIsMore(true)
  }

  const handleLazyLoad = (event: any, type?: string) => {
    const lastEntry = _.last(data)
    setLazyLoad(prevLazyLoad => ({
      ...prevLazyLoad,
      filter: {
        ...prevLazyLoad.filter,
        periodStart_lt: _.get(lastEntry, 'startTime'),
        type: type ? type : prevLazyLoad.filter.type,
      },
    }))
    setIsFetch(true)
  }

  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant='h6'>Encounter</Typography>
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
      <div className={classes.tableWrapper}>
        <TableBase
          id='encounter'
          onEntrySelected={handleEncounterSelect}
          entryList={data}
          isLoading={isLoading}
          isMore={isMore}
          onLazyLoad={handleLazyLoad}
          data-testid='table-base'
          tableCells={[
            {
              bodyCell: {
                align: 'left',
                id: 'type',
              },
              headCell: {
                align: 'center',
                disablePadding: true,
                disableSort: true,
                id: 'type',
                label: 'Type',
              },
            },
            {
              bodyCell: {
                align: 'left',
                id: 'reason',
              },
              headCell: {
                align: 'left',
                disablePadding: false,
                disableSort: true,
                id: 'reason',
                label: 'Reason',
                styles: {
                  width: '15em',
                },
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'classCode',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'classCode',
                label: 'ClassCode',
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
                disablePadding: true,
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
                id: 'startTime',
                render: (encounter: any) => (
                  <>
                    {_.get(encounter, 'startTime')
                      ? moment
                          .default(_.get(encounter, 'startTime'))
                          .format(environment.localFormat.dateTime)
                      : null}
                  </>
                ),
              },
              headCell: {
                align: 'center',
                disablePadding: true,
                disableSort: true,
                id: 'startTime',
                label: 'StartTime',
                styles: {
                  width: '10em',
                },
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'endTime',
                render: (encounter: any) => (
                  <>
                    {_.get(encounter, 'endTime')
                      ? moment
                          .default(_.get(encounter, 'endTime'))
                          .format(environment.localFormat.dateTime)
                      : null}
                  </>
                ),
              },
              headCell: {
                align: 'center',
                disablePadding: true,
                disableSort: true,
                id: 'endTime',
                label: 'EndTime',
                styles: {
                  width: '10em',
                },
              },
            },
          ]}
        />
      </div>
    </>
  )
}

export default PatientEncounterTable
