import * as React from 'react'

import {
  initialObservationBodyHeightGraphStructure,
  IObservationBodyHeightGraphStructure,
} from '@app/reducers-redux/observation/observationBodyHeightGraph.reducer'
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
        ? theme.palette?.quinary?.dark
        : theme.palette?.quinary?.light,
    color: theme.palette.quinary?.main || '',
  },
  summaryContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}))
export const ObservationBodyHeightGraphWithConnector: React.FunctionComponent<{
  patientId?: string
  mouseTrackCategory?: string
  max?: number
  optionStyle?: IOptionsStyleGraphOption
}> = ({ patientId, max, mouseTrackCategory, optionStyle }) => {
  const state = useSelector((state: any) => state.observationBodyHeightGraph)
  return (
    <ObservationBodyHeightGraph
      patientId={patientId || state?.patientId}
      max={max}
      mouseTrackCategory={mouseTrackCategory}
      optionStyle={optionStyle}
      structure={state?.structure}
    />
  )
}

const ObservationBodyHeightGraph: React.FunctionComponent<{
  patientId: string
  structure?: IObservationBodyHeightGraphStructure
  max?: number
  optionStyle?: IOptionsStyleGraphOption
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  patientId,
  structure = initialObservationBodyHeightGraphStructure,
  max = 20,
  optionStyle,
  mouseTrackCategory = 'observation_body_height_graph',
  mouseTrackLabel = 'observation_body_height_graph',
}) => {
  const params = {
    code: OBSERVATION_CODE.BODY_HEIGHT.code,
    patientId,
    // encounterId: get(query, 'encounterId'),
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
        <ObservationBodyHeightGraphViewWithTheme
          observationList={observationList}
          optionStyle={optionStyle}
          structure={structure}
        />
      </div>
    </TrackerMouseClick>
  )
}

export default ObservationBodyHeightGraph

export const ObservationBodyHeightGraphView: React.FunctionComponent<{
  observationList: any
  structure: IObservationBodyHeightGraphStructure
  theme?: any
  optionStyle?: IOptionsStyleGraphOption
}> = ({ observationList, structure, optionStyle, theme }) => {
  const lastData: any = maxBy(observationList, 'issuedDate')

  const classes = useStyles()
  return (
    <>
      <ToolbarWithFilter
        title={'Body Height'}
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
              color: theme?.palette?.quinary?.main || '#00b0ff',
              ...optionStyle,
              height:
                optionStyle && optionStyle.height && optionStyle.height - 200,
            }}
            options={{
              ArgumentScale: <ArgumentScale factory={scaleTime as any} />,
              ValueScale: <ValueScale modifyDomain={() => [80, 200]} />,
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
                  style={{ fontSize: '1.5rem', color: '#00b0ff' }}
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

const ObservationBodyHeightGraphViewWithTheme = withTheme(
  ObservationBodyHeightGraphView,
)
