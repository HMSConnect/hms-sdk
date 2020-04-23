import * as React from 'react'

import {
  initialObservationBodyMassIndexGraphStructure,
  IObservationBodyMassIndexGraphStructure,
} from '@app/reducers-redux/observation/observationBodyMassIndexGraph.reducer'
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
        ? theme.palette?.denary?.dark
        : theme.palette?.denary?.light,
    color: theme.palette.denary?.main || '',
  },
  summaryContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
  },
}))

export const ObservationBodyMassIndexGraphWithConnector: React.FunctionComponent<{
  patientId?: string
  mouseTrackCategory?: string
  max?: number
  optionStyle?: IOptionsStyleGraphOption
}> = ({ patientId, max, mouseTrackCategory, optionStyle }) => {
  const state = useSelector((state: any) => state.observationBodyMassIndexGraph)
  return (
    <ObservationBodyMassIndexGraph
      patientId={patientId || state?.patientId}
      max={max}
      mouseTrackCategory={mouseTrackCategory}
      optionStyle={optionStyle}
      structure={state?.structure}
    />
  )
}

const ObservationBodyMassIndexGraph: React.FunctionComponent<{
  patientId: string
  structure?: IObservationBodyMassIndexGraphStructure
  max?: number
  optionStyle?: IOptionsStyleGraphOption
  mouseTrackCategory?: string
  mouseTrackLabel?: string
}> = ({
  patientId,
  structure = initialObservationBodyMassIndexGraphStructure,
  max = 20,
  optionStyle,
  mouseTrackCategory = 'observaion_body_mass_index_graph',
  mouseTrackLabel = 'observaion_body_mass_index_graph',
}) => {
  const params = {
    code: OBSERVATION_CODE.BODY_MASS_INDEX.code,
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
        <ObservationBodyMassIndexGraphViewWithTheme
          observationList={observationList}
          optionStyle={optionStyle}
          structure={structure}
        />
      </div>
    </TrackerMouseClick>
  )
}

export default ObservationBodyMassIndexGraph

export const ObservationBodyMassIndexGraphView: React.FunctionComponent<{
  observationList: any
  structure: IObservationBodyMassIndexGraphStructure
  theme?: any
  optionStyle?: IOptionsStyleGraphOption
}> = ({ observationList, structure, optionStyle, theme }) => {
  const lastData: any = maxBy(observationList, 'issuedDate')

  const classes = useStyles()
  return (
    <>
      <ToolbarWithFilter
        title={'Body Mass Index'}
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
              color: theme?.palette?.denary?.main || '#ff3d00',
              ...optionStyle,
              height:
                optionStyle && optionStyle.height && optionStyle.height - 200,
            }}
            options={{
              ArgumentScale: <ArgumentScale factory={scaleTime as any} />,
              ValueScale: <ValueScale modifyDomain={() => [0, 50]} />,
              type: 'area',
            }}
          />
          <Divider />
        </div>
        {structure.summaryField ? (
          <div className={classes.summaryContainer}>
            {lastData ? (
              <>
                {' '}
                {structure.dateTimeField ? (
                  <Typography variant='body1' style={{}}>
                    {lastData.issued}
                  </Typography>
                ) : null}
                <Typography
                  variant='body1'
                  style={{ fontSize: '1.5rem', color: '#ff3d00' }}
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
        ) : null}
      </div>

      {/* </Paper> */}
    </>
  )
}
const ObservationBodyMassIndexGraphViewWithTheme = withTheme(
  ObservationBodyMassIndexGraphView,
)
