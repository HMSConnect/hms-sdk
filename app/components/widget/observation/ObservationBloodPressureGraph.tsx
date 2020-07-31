import {
  initialObservationBloodPressureGraphStructure,
  IObservationBloodPressureGraphStructure,
} from '@app/reducers-redux/observation/observationBloodPressureGraph.reducer'
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
import _ from 'lodash'
import * as React from 'react'
import { useSelector } from 'react-redux'

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
  headerCard: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette?.tertiary?.dark
        : theme.palette?.tertiary?.light,
    color: theme.palette.tertiary?.main || '',
  },
  iconCard: {
    color:
      theme.palette.type === 'dark'
        ? theme.palette?.tertiary?.main
        : theme.palette?.tertiary?.dark,
  },
  summaryContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
  summaryContent: {
    color: theme.palette.tertiary?.main || '',
  },
}))

export const ObservationBloodPressureGraphWithConnector: React.FunctionComponent<{
  patientId?: string
  mouseTrackCategory?: string
  max?: number
  optionStyle?: IOptionsStyleGraphOption
}> = ({ patientId, max, mouseTrackCategory, optionStyle }) => {
  const state = useSelector((state: any) => state.observationBloodPressureGraph)
  return (
    <ObservationBloodPressureGraph
      patientId={patientId || state?.patientId}
      max={max}
      mouseTrackCategory={mouseTrackCategory}
      optionStyle={optionStyle}
      structure={state?.structure}
    />
  )
}

const ObservationBloodPressureGraph: React.FunctionComponent<{
  patientId: string
  structure?: IObservationBloodPressureGraphStructure
  max?: number
  optionStyle?: IOptionsStyleGraphOption
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  patientId,
  structure = initialObservationBloodPressureGraphStructure,
  max = 20,
  optionStyle,
  mouseTrackCategory = 'observation_blood_pressure_graph',
  mouseTrackLabel = 'observation_blood_pressure_graph',
}) => {
  const params = {
    code: OBSERVATION_CODE.BLOOD_PRESSURE.code,
    patientId,
    // encounterId: get(query, 'encounterId'),
  } as IObservationListFilterQuery

  const { isLoading, data: observationList, error } = useObservationList(
    {
      filter: params || {},
      max: max || 20,
      sort: {
        order: 'asc',
        orderBy: 'issued',
      },
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
        <ObservationBloodPressureGraphViewWithTheme
          observationList={observationList}
          optionStyle={optionStyle}
          structure={structure}
        />
      </div>
    </TrackerMouseClick>
  )
}

export default ObservationBloodPressureGraph

export const ObservationBloodPressureGraphView: React.FunctionComponent<{
  observationList: any
  structure: IObservationBloodPressureGraphStructure
  theme?: any
  optionStyle?: IOptionsStyleGraphOption
}> = ({ observationList, structure, optionStyle = {}, theme }) => {
  const lastData: any = _.maxBy(observationList, 'issuedDate')
  const classes = useStyles()

  const prepareData = (data: any) => {
    return _.chain(data)
      .map((item) => {
        const objectData: any = _.reduce(
          item['valueModal'],
          (acc, v) => {
            const key = _.camelCase(v.code)
            return {
              ...acc,
              [key]: v.value,
            }
          },
          {},
        )
        if (!objectData.systolicBloodPressure) {
          objectData.systolicBloodPressure = 0
        }
        if (!objectData.diastolicBloodPressure) {
          objectData.diastolicBloodPressure = 0
        }
        return {
          ...objectData,
          issuedDate: item.issuedDate,
        }
      })
      .value()
  }
  return (
    <>
      <ToolbarWithFilter
        title={'Blood Pressure'}
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
              color: theme?.palette?.tertiary?.main || '#e57373',
              height:
                optionStyle && optionStyle.height && optionStyle.height - 200,
            }}
            options={{
              ArgumentScale: <ArgumentScale factory={scaleTime as any} />,
              customPrepareGraphData: prepareData,
              ValueScale: <ValueScale modifyDomain={() => [0, 150]} />,
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
                  className={classes.summaryContent}
                  style={{ fontSize: '1.5rem' }}
                >
                  {lastData.value}
                  {lastData.unit}
                </Typography>
              ) : null}
            </>
          ) : (
            <Typography variant='h6'>N/A</Typography>
          )}
        </div>
      </div>
    </>
  )
}

const ObservationBloodPressureGraphViewWithTheme = withTheme(
  ObservationBloodPressureGraphView,
)
