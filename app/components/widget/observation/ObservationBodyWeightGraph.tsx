import * as React from 'react'

import {
  initialObservationBodyWeightGraphStructure,
  IObservationBodyWeightGraphStructure,
} from '@app/reducers-redux/observation/observationBodyWeightGraph.reducer'
import ErrorSection from '@components/base/ErrorSection'
import GraphBase from '@components/base/GraphBase'
import LoadingSection from '@components/base/LoadingSection'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import TrackerMouseClick from '@components/base/TrackerMouseClick'
import useObservationList from '@components/hooks/useObservationList'
import { OBSERVATION_CODE } from '@config/observation'
import { IObservationListFilterQuery } from '@data-managers/ObservationDataManager'
import { ArgumentScale, ValueScale } from '@devexpress/dx-react-chart'
import {
  Divider,
  Icon,
  makeStyles,
  Theme,
  Typography,
  withTheme,
} from '@material-ui/core'
import { scaleTime } from 'd3-scale'
import maxBy from 'lodash/maxBy'
import { useSelector } from 'react-redux'
import { IOptionsStyleGraphOption } from './ObservationBloodPressureGraph'

const useStyles = makeStyles((theme: Theme) => ({
  headerCard: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette?.duodenary?.dark
        : theme.palette?.duodenary?.light,
    color: theme.palette.duodenary?.main || '',
  },
  summaryContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}))

export const ObservationBodyWeightGraphWithConnector: React.FunctionComponent<{
  patientId?: string
  mouseTrackCategory?: string
  max?: number
  optionStyle?: IOptionsStyleGraphOption
}> = ({ patientId, max, mouseTrackCategory, optionStyle }) => {
  const state = useSelector((state: any) => state.observationBodyWeightGraph)
  return (
    <ObservationBodyWeightGraph
      patientId={patientId || state?.patientId}
      max={max}
      mouseTrackCategory={mouseTrackCategory}
      optionStyle={optionStyle}
      structure={state?.structure}
    />
  )
}

const ObservationBodyWeightGraph: React.FunctionComponent<{
  patientId: string
  structure?: IObservationBodyWeightGraphStructure
  max?: number
  optionStyle?: IOptionsStyleGraphOption
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  patientId,
  structure = initialObservationBodyWeightGraphStructure,
  max = 20,
  optionStyle,
  mouseTrackCategory = 'observation_body_weight_graph',
  mouseTrackLabel = 'observation_body_weight_graph',
}) => {
  const params = {
    code: OBSERVATION_CODE.BODY_WEIGHT.code,
    // encounterId: get(query, 'encounterId'),
    patientId,
  } as IObservationListFilterQuery

  const { isLoading, data: observationList, error } = useObservationList(
    {
      filter: params || {},
      max: max || 20,
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
    <TrackerMouseClick category={mouseTrackCategory} label={mouseTrackLabel}>
      <div style={{ height: '100%' }}>
        <ObservationBodyWeightGraphViewWithTheme
          observationList={observationList}
          optionStyle={optionStyle}
          structure={structure}
        />
      </div>
    </TrackerMouseClick>
  )
}

export default ObservationBodyWeightGraph

export const ObservationBodyWeightGraphView: React.FunctionComponent<{
  observationList: any
  structure: IObservationBodyWeightGraphStructure
  theme?: any
  optionStyle?: IOptionsStyleGraphOption
}> = ({ observationList, structure, optionStyle, theme }) => {
  const lastData: any = maxBy(observationList, 'issuedDate')

  const classes = useStyles()
  return (
    <>
      <ToolbarWithFilter
        title={'Body Weight'}
        Icon={
          structure.headerIconField ? (
            <Icon className={'fas fa-chart-area'} />
          ) : null
        }
        option={{
          headerClass: classes.headerCard,
          isHideIcon: true,
          style: {
            height: '5%',
          },
        }}
      ></ToolbarWithFilter>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '95%',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'block' }}>
          <GraphBase
            data={observationList}
            argumentField='issuedDate'
            optionStyle={{
              color: theme?.palette?.duodenary?.main || '#3d5afe',
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
        </div>
        <div className={classes.summaryContainer}>
          {lastData ? (
            <>
              {' '}
              {structure.dateTimeField ? (
                <Typography variant='body1' style={{}}>
                  {lastData.issued}
                </Typography>
              ) : null}
              {structure.valueField ? (
                <Typography
                  variant='body1'
                  style={{ fontSize: '1.5rem', color: '#3d5afe' }}
                >
                  {lastData.value}
                  {lastData.unit}
                </Typography>
              ) : null}
            </>
          ) : (
            <Typography variant='h6' style={{}}>
              N/A
            </Typography>
          )}
        </div>
      </div>
      {/* </Paper> */}
    </>
  )
}
const ObservationBodyWeightGraphViewWithTheme = withTheme(
  ObservationBodyWeightGraphView,
)
