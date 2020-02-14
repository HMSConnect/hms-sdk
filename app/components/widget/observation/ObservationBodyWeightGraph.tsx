import * as React from 'react'

import ErrorSection from '@components/base/ErrorSection'
import GraphBase from '@components/base/GraphBase'
import LoadingSection from '@components/base/LoadingSection'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useObservationList from '@components/hooks/useObservationList'
import { OBSERVATION_CODE } from '@config/observation'
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
import get from 'lodash/get'
import maxBy from 'lodash/maxBy'
import { IOptionsStyleGraphOption } from './ObservationBloodPressureGraph'
import { lighten } from '@material-ui/core/styles'

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
  optionStyle?: IOptionsStyleGraphOption
}> = ({ query, optionStyle }) => {
  const params = {
    code: OBSERVATION_CODE.BODY_WEIGHT.code,
    // encounterId: get(query, 'encounterId'),
    patientId: get(query, 'patientId'),
  } as IObservationListFilterQuery

  const { isLoading, data: observationList, error } = useObservationList(
    {
      filter: params || {},
      max: get(query, 'max') || 20,
    },
    ['patientId'],
  )
  if (error) {
    return <ErrorSection error={error} />
  }

  if (isLoading) {
    return <LoadingSection />
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
  optionStyle?: IOptionsStyleGraphOption
}> = ({ observationList, optionStyle }) => {
  const lastData: any = maxBy(observationList, 'issuedDate')

  const classes = useStyles()
  return (
    <>
      <ToolbarWithFilter
        title={'Body Weight'}
        option={{
          isHideIcon: true,
          style: {
            backgroundColor: lighten('#3d5afe', 0.85),
            color: '#3d5afe',
          },
        }}
      ></ToolbarWithFilter>
      <GraphBase
        data={observationList}
        argumentField='issuedDate'
        optionStyle={{
          color: '#3d5afe',
          ...optionStyle,
          height: optionStyle && optionStyle.height && optionStyle.height - 200,
        }}
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
              style={{ fontSize: '1.5rem', color: '#3d5afe' }}
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
