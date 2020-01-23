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

export interface IOptionsStyleGraphOption {
  color?: string
  colorToolbarBackground?: string
  colorToolbarTitle?: string
  colorSummary?: string
  fontSize?: string
  height?: number
  weight?: number
}

const useStyles = makeStyles((theme: Theme) => ({
  summaryContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}))

const ObservationBloodPressureGraph: React.FunctionComponent<{
  query: any
  optionStyle?: IOptionsStyleGraphOption
}> = ({ query, optionStyle }) => {
  const params = {
    code: _.get(query, 'code') || '55284-4',
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
      <ObservationBloodPressureGraphView
        observationList={observationList}
        optionStyle={optionStyle}
      />
    </>
  )
}

export default ObservationBloodPressureGraph

export const ObservationBloodPressureGraphView: React.FunctionComponent<{
  observationList: any
  optionStyle?: IOptionsStyleGraphOption
}> = ({ observationList, optionStyle = {} }) => {
  const lastData: any = _.maxBy(observationList, 'issuedDate')

  const classes = useStyles()
  return (
    <>
      <ToolbarWithFilter
        title={'Blood Pressure'}
        option={{
          isHideIcon: true,
          style: {
            backgroundColor: '#ef5350',
            color: '#e1f5fe',
          },
        }}
      ></ToolbarWithFilter>
      <GraphBase
        data={observationList}
        argumentField='issuedDate'
        optionStyle={{
          color: '#e57373',
          ...optionStyle,
          height: optionStyle && optionStyle.height && optionStyle.height - 200,
        }}
        options={{
          ArgumentScale: <ArgumentScale factory={scaleTime as any} />,
          ValueScale: <ValueScale modifyDomain={() => [40, 150]} />,
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
