import React from 'react'

import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import TableBase from '@components/base/TableBase'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { IConditionListFilterQuery } from '@data-managers/ConditionDataManager'
import { Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ConditionService from '@services/ConditionService'
import { HMSService } from '@services/HMSServiceFactory'
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

const PatientConditionTable: React.FunctionComponent<{
  patientId: any
  isInitialize?: boolean
  resourceList?: any[]
  max?: number
}> = ({ resourceList, patientId, max, isInitialize }) => {
  const [filter, setFilter] = React.useState<IConditionListFilterQuery>({
    onsetDateTime_lt: undefined,
    patientId,
  })

  const fetchMoreAsync = async (lastEntry: any) => {
    const conditionService = HMSService.getService(
      'condition',
    ) as ConditionService
    const newFilter: IConditionListFilterQuery = {
      ...filter,
      onsetDateTime_lt: _.get(lastEntry, 'onsetDateTime'),
      patientId,
    }
    setFilter(newFilter)
    const newLazyLoad = {
      filter: newFilter,
      max: max || 10,
    }
    const entryData = await conditionService.list(newLazyLoad)
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

  const { data, error, isLoading, setIsFetch } = useInfinitScroll(
    myscroll.current,
    fetchMoreAsync,
    resourceList,
  )

  React.useEffect(() => {
    if (isInitialize) {
      setIsFetch(true)
    }
  }, [isInitialize])

  const classes = useStyles()

  const handleConditionSelect = (
    event: React.MouseEvent,
    selectedEncounter: any,
  ) => {
    // TODO handle select condition
    // routes.Router.push({
    //   pathname: `/patient-info/encounter/${selectedEncounter.id}`,
    //   query: {
    //     patientId,
    //   },
    // })
  }

  if (error) {
    return <>Error: {error}</>
  }

  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <Typography variant='h6'>Condition</Typography>
        </Grid>
      </Grid>
      <div
        ref={myscroll}
        className={classes.tableWrapper}
        data-testid='scroll-container'
      >
        <TableBase
          id='condition'
          entryList={data}
          isLoading={isLoading}
          data-testid='table-base'
          tableCells={[
            {
              bodyCell: {
                align: 'left',
                id: 'codeText',
              },
              headCell: {
                align: 'left',
                disablePadding: true,
                disableSort: true,
                id: 'codeText',
                label: 'Condition',
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'clinicalStatus',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'clinicalStatus',
                label: 'ClinicalStatus',
                styles: {
                  width: '5em',
                },
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'verificationStatus',
              },
              headCell: {
                align: 'center',
                disablePadding: false,
                disableSort: true,
                id: 'verificationStatus',
                label: 'VerificationStatus',
                styles: {
                  width: '5em',
                },
              },
            },
            {
              bodyCell: {
                align: 'center',
                id: 'onset',
              },
              headCell: {
                align: 'center',
                disablePadding: true,
                disableSort: true,
                id: 'onset',
                label: 'Onset Date',
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

export default PatientConditionTable
