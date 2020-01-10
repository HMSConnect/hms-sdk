import { IHeaderCellProps } from '@components/base/EnhancedTableHead'
import TableBase from '@components/base/TableBase'
import useInfinitScroll from '@components/hooks/useInfinitScroll'
import { Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AllergyIntoleranceService from '@services/AllergyIntoleranceService'
import { HMSService } from '@services/HMSServiceFactory'
import { sendMessage } from '@utils'
import * as _ from 'lodash'
import React from 'react'

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

const PatientAllergyIntolerance: React.FunctionComponent<{
  resourceList: any[]
  patientId: any
}> = ({ resourceList, patientId }) => {
  const classes = useStyles()

  const myscroll = React.useRef<HTMLDivElement | null>(null)

  const { data, error, isLoading } = useInfinitScroll(
    myscroll.current,
    fetchMoreAsync,
    resourceList,
  )

  async function fetchMoreAsync(lastEntry: any) {
    const allergyIntoleranceService = HMSService.getService(
      'allergy_intolerance',
    ) as AllergyIntoleranceService
    const newLazyLoad = {
      filter: {
        onsetDateTime_lt: _.get(lastEntry, 'onsetDateTime'),
        patientId,
      },
      max: 10,
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
          onEntrySelected={handleConditionSelect}
          entryList={data}
          isLoading={isLoading}
          data-testid='table-base'
          tableCells={[
            {
              bodyCell: {
                align: 'left',
                id: 'display',
              },
              headCell: {
                align: 'left',
                disablePadding: true,
                disableSort: true,
                id: 'display',
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
                label: 'asserted Date',
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

export default PatientAllergyIntolerance
