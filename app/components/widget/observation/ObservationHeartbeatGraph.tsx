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
import { lighten } from '@material-ui/core/styles'
import { scaleTime } from 'd3-scale'
import get from 'lodash/get'
import maxBy from 'lodash/maxBy'
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

const ObservationHeartbeatGraph: React.FunctionComponent<{
  query: any
  optionStyle?: IOptionsStyleGraphOption
}> = ({ query, optionStyle }) => {
  const params = {
    code: OBSERVATION_CODE.HEARTBEAT.code,
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
      <ObservationHeartbeatGraphView
        observationList={observationList}
        optionStyle={optionStyle}
      />
    </>
  )
}

export default ObservationHeartbeatGraph

export const ObservationHeartbeatGraphView: React.FunctionComponent<{
  observationList: any
  optionStyle?: IOptionsStyleGraphOption
}> = ({ observationList, optionStyle }) => {
  const lastData: any = maxBy(observationList, 'issuedDate')

  const classes = useStyles()
  return (
    <>
      <ToolbarWithFilter
        title={'Heartbeat'}
        option={{
          isHideIcon: true,
          style: {
            backgroundColor: lighten('#c2185b', 0.85),
            color: '#c2185b',
          },
        }}
      ></ToolbarWithFilter>
      <Paper>
        <GraphBase
          data={observationList}
          argumentField='issuedDate'
          optionStyle={{
            color: '#c2185b',
            ...optionStyle,
            height:
              optionStyle && optionStyle.height && optionStyle.height - 200,
          }}
          options={{
            ArgumentScale: <ArgumentScale factory={scaleTime as any} />,
            ValueScale: <ValueScale modifyDomain={() => [10, 200]} />,
            type: 'area',
          }}
        />
        <Divider />
        <div className={classes.summaryContainer}>
          {lastData ? (
            <>
              {' '}
              <Typography variant='body1' style={{}}>
                {lastData.issued}
              </Typography>
              <Typography
                variant='body1'
                style={{ fontSize: '1.5rem', color: '#c2185b' }}
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
        </div>
      </Paper>
    </>
  )
}
