import GraphBase from '@components/base/GraphBase'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useObservationList from '@components/hooks/useObservationList'
import { IObservationListFilterQuery } from '@data-managers/ObservationDataManager'
import { ArgumentScale, ValueScale } from '@devexpress/dx-react-chart'
import {
  Divider,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core'
import { scaleTime } from 'd3-scale'
import * as _ from 'lodash'
import * as React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  summaryContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}))

const ObservationBodyWeightGraph: React.FunctionComponent<{
  query: any
  optionStyle?: any
}> = ({ query, optionStyle }) => {
  const params = {
    code: _.get(query, 'code') || '29463-7',
    encounterId: _.get(query, 'encounterId'),
    patientId: _.get(query, 'patientId'),
  } as IObservationListFilterQuery

  const { isLoading, data: observationList, error } = useObservationList({
    filter: params || {},
    max: 10,
  })
  if (error) {
    return <div>ERR: {error}.</div>
  }
  if (isLoading) {
    return <div>loading...</div>
  }
  return (
    <>
      <ObservationBodyWeightGraphView
        observationList={observationList}
        optionStyle={optionStyle}
      />
    </>
  )
}

export default ObservationBodyWeightGraph

export const ObservationBodyWeightGraphView: React.FunctionComponent<{
  observationList: any
  optionStyle?: any
}> = ({ observationList, optionStyle }) => {
  const lastData: any = _.maxBy(observationList, 'issuedDate')

  const classes = useStyles()
  return (
    <>
      <ToolbarWithFilter
        title={'Body Weight'}
        option={{
          isHideIcon: true,
          style: {
            backgroundColor: '#536dfe',
            color: '#e1f5fe',
          },
        }}
      ></ToolbarWithFilter>
      <GraphBase
        data={observationList}
        argumentField='issuedDate'
        optionStyle={{ ...optionStyle, color: '#536dfe' }}
        options={{
          ArgumentScale: <ArgumentScale factory={scaleTime as any} />,
          ValueScale: <ValueScale modifyDomain={() => [10, 120]} />,
          type: 'area',
        }}
      />
      <Divider />
      <Paper className={classes.summaryContainer}>
        {lastData ? (
          <>
            {' '}
            <Typography variant='body1' style={{}}>
              {lastData.issued}
            </Typography>
            <Typography
              variant='body1'
              style={{ fontSize: '1.5rem', color: '#ef5350' }}
            >
              {lastData.value}
              {lastData.unit}
            </Typography>
          </>
        ) : (
          <Typography variant='h6' style={{}}>
            N/A
          </Typography>
        )}
      </Paper>
    </>
  )
}
