import * as React from 'react'

import ErrorSection from '@components/base/ErrorSection'
import GraphBase from '@components/base/GraphBase'
import LoadingSection from '@components/base/LoadingSection'
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
import { IOptionsStyleGraphOption } from './ObservationBloodPressureGraph'

const useStyles = makeStyles((theme: Theme) => ({
  summaryContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}))

const ObservationBodyHeightGraph: React.FunctionComponent<{
  query: any
  optionStyle?: IOptionsStyleGraphOption
}> = ({ query, optionStyle }) => {
  const params = {
    code: _.get(query, 'code') || '8302-2',
    // encounterId: _.get(query, 'encounterId'),
    patientId: _.get(query, 'patientId'),
  } as IObservationListFilterQuery
  const { isLoading, data: observationList, error } = useObservationList(
    {
      filter: params || {},
      max: _.get(query, 'max') || 20,
    },
    ['patientId']
  )
  if (error) {
    return <ErrorSection error={error} />
  }

  if (isLoading) {
    return <LoadingSection />
  }
  return (
    <>
      <ObservationBodyHeightGraphView
        observationList={observationList}
        optionStyle={optionStyle}
      />
    </>
  )
}

export default ObservationBodyHeightGraph

export const ObservationBodyHeightGraphView: React.FunctionComponent<{
  observationList: any
  optionStyle?: IOptionsStyleGraphOption
}> = ({ observationList, optionStyle }) => {
  const lastData: any = _.maxBy(observationList, 'issuedDate')

  const classes = useStyles()
  return (
    <>
      <ToolbarWithFilter
        title={'Body Height'}
        option={{
          isHideIcon: true,
          style: {
            backgroundColor: '#004d40',
            color: '#e1f5fe',
          },
        }}
      ></ToolbarWithFilter>
      <GraphBase
        data={observationList}
        argumentField='issuedDate'
        optionStyle={{
          color: '#00b0ff',
          ...optionStyle,
          height: optionStyle && optionStyle.height && optionStyle.height - 200,
        }}
        options={{
          ArgumentScale: <ArgumentScale factory={scaleTime as any} />,
          ValueScale: <ValueScale modifyDomain={() => [80, 200]} />,
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
