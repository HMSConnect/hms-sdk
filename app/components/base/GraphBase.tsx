import React from 'react'

import useWindowSize from '@components/hooks/useWindowSize'
import { EventTracker, SplineSeries } from '@devexpress/dx-react-chart'
import {
  AreaSeries,
  ArgumentAxis,
  Chart,
  Legend,
  ScatterSeries,
  SplineSeries as SplineSeriesMat,
  Tooltip,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui'
import environment from '@environment'
import { makeStyles, Theme, Typography, styled } from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { area, curveCatmullRom, symbol, symbolCircle } from 'd3-shape'
import * as _ from 'lodash'
import * as moment from 'moment'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
interface IGraphLineOption {
  includeLegend?: boolean
  customPrepareGraphData?: (data: any) => any
  ArgumentScale?: any
  ValueScale?: any
  valueUnit?: string
  type?: 'line' | 'area'
}

const MAP_COLOR_WITH_OBSERVATION: any = {
  // bodyWeight: {
  //   color: '#536dfe',
  // },
  bodyMassIndex: {
    color: 'grey',
  },
  normalBodyMassIndexHigh: {
    color: 'grey',
  },
  diastolicBloodPressure: {
    color: 'blue',
  },
  systolicBloodPressure: {
    color: '#e57373',
  },
}

const useStyles = makeStyles((theme: Theme) => ({
  tooltiptext: {
    backgroundColor: '#555',
    borderRadius: '6px',
    bottom: '125%',
    color: '#fff',
    left: '50%',
    marginLeft: '-60px',
    opacity: 1,
    padding: '5px 0',
    position: 'absolute',
    textAlign: 'center',
    transition: 'opacity 0.3s',
    width: '1300%',
    zIndex: 1,
  },
}))

const Marker: React.FunctionComponent<any> = (props: any) => {
  const { name, color } = props
  const findMapObservation = _.find(
    MAP_COLOR_WITH_OBSERVATION,
    (value, key) => {
      return key === _.camelCase(name)
    },
  )
  if (_.startsWith(_.camelCase(name), 'normal')) {
    return (
      <MoreHorizIcon
        style={{ color: _.get(findMapObservation, 'color') || color }}
      />
    )
  }
  return (
    <FiberManualRecordIcon
      style={{ color: _.get(findMapObservation, 'color') || color }}
    />
  )
}

const LegendRoot: React.FunctionComponent<Legend.RootProps> = (
  props: Legend.RootProps,
) => {
  return (
    <Legend.Root
      {...props}
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        margin: 'auto',
        width: '100%',
        // WebkitDisplay: '-webkit-box -webkit-flex'
      }}
    />
  )
}

const LegendItem: React.FunctionComponent<Legend.ItemProps> = (
  props: Legend.ItemProps,
) => {
  return (
    <Legend.Item
      {...props}
      style={{
        width: '100px',
        flexDirection: 'column',
        marginLeft: '-2px',
        marginRight: '-2px',
      }}
    />
  )
}

const ValueLabel = (props: any) => {
  const { text, unit } = props
  return <ValueAxis.Label {...props} text={`${text} ${unit || ''}`} />
}

// const ValueLabel = (props: any, unit: any) => (props: any) => {
//   const { text, unit } = props
//   return <ValueAxis.Label {...props} text={`${text} ${unit || ''}`} />
// }

const Point = (type: any, styles: any) => (props: any) => {
  const { arg, val, color } = props
  return (
    <path
      fill={_.get(styles, 'color') || color}
      transform={`translate(${arg} ${val})`}
      d={symbol().type(type)() as string}
      style={styles}
    />
  )
}

const LineWithCirclePoint: React.FunctionComponent<any> = (props: any) => {
  return (
    <>
      <SplineSeriesMat.Path
        {...props}
        color={_.get(props, 'optionstyle.color') || props.color}
      />
      <ScatterSeries.Path
        {...props}
        pointComponent={Point(symbolCircle, {
          ..._.get(props, 'optionstyle'),
          stroke: 'grey',
          strokeWidth: '2px',
        })}
      />
    </>
  )
}
const DashLineWithCirclePoint: React.FunctionComponent<any> = (props: any) => {
  return (
    <>
      <SplineSeriesMat.Path
        {...props}
        color={_.get(props, 'optionstyle.color') || props.color}
        style={{ strokeDasharray: '5,5' }}
      />
      <ScatterSeries.Path
        {...props}
        pointComponent={Point(symbolCircle, {
          ..._.get(props, 'optionstyle'),
          stroke: 'grey',
          strokeWidth: '2px',
        })}
      />
    </>
  )
}

const TooltipContent: React.FunctionComponent<{
  graphData: any
}> = ({ graphData }) => {
  const classes = useStyles()
  const TooltipContentComponent: React.FunctionComponent<any> = props => {
    const targetElement = props.targetItem
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={classes.tooltiptext}>
          {_.map(graphData[targetElement.point], (value, key) => (
            <Typography variant='body2' key={`tooltipText${key}`}>
              <>
                {_.truncate(_.startCase(key), { length: 15 })} :
                {_.isDate(value)
                  ? moment
                    .default(value)
                    .format(environment.localFormat.dateTime)
                  : Number(value).toFixed(2)}
              </>
            </Typography>
          ))}
        </div>
      </div>
    )
  }
  return <Tooltip contentComponent={TooltipContentComponent} />
}

const GraphBase: React.FunctionComponent<{
  data: any[]
  argumentField: string
  valueField?: string
  options?: IGraphLineOption
  optionStyle?: any
}> = ({
  data,
  optionStyle = {},
  argumentField,
  valueField,
  options = {
    ArgumentScale: '',
    ValueScale: '',
    customPrepareGraphData: null,
    includeLegend: false,
    type: 'line',
    valueUnit: '',
  },
}) => {
    const [graphData, setGraphData] = React.useState<any[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
      if (data) {
        prepareGraphData(data)
      }
    }, [])
    const prepareGraphData = (data: any) => {
      let newValue: any[] = []
      if (!options.customPrepareGraphData) {
        newValue = _.chain(data)
          .map(item => {
            const objectData = _.reduce(
              valueField ? item[valueField] : item['valueModal'],
              (acc, v) => {
                const key = _.camelCase(v.code)
                return {
                  ...acc,
                  [key]: v.value,
                }
              },
              {},
            )

            return {
              ...objectData,
              [argumentField]: item[argumentField],
            }
          })
          .value()
      } else {
        newValue = options.customPrepareGraphData(data)
      }

      setGraphData(newValue)
      setIsLoading(false)
    }
    if (isLoading) {
      return null
    }

    const renderGraph = (type?: 'line' | 'area') => {
      switch (type) {
        case 'line':
          return (
            <GraphLine
              graphData={graphData}
              argumentField={argumentField}
              options={options}
              optionStyle={optionStyle}
            />
          )
        case 'area':
          return (
            <GraphArea
              graphData={graphData}
              argumentField={argumentField}
              options={options}
              optionStyle={optionStyle}
            />
          )
        default:
          return (
            <GraphLine
              graphData={graphData}
              argumentField={argumentField}
              options={options}
              optionStyle={optionStyle}
            />
          )
      }
    }

    return renderGraph(options.type)
  }

export const GraphLine: React.FunctionComponent<{
  graphData: any
  argumentField: string
  options?: any
  optionStyle?: any
}> = ({ graphData, argumentField, options, optionStyle }) => {
  const { width, height, standardSize } = useWindowSize()
  if (_.isEmpty(graphData)) {
    return (
      <Typography
        variant='body1'
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          minHeight: 400,
        }}
      >
        {' '}
        No Data for display
      </Typography>
    )
  }
  return (
    <Chart
      height={optionStyle.height}
      width={optionStyle.width}
      data={graphData}
    >
      {options.ArgumentScale}
      {options.ValueScale}

      <ArgumentAxis />
      <ValueAxis
        // labelComponent={(props: any) => ValueLabel(props, options.valueUnit)}
        labelComponent={props => (
          <ValueLabel {...props} unit={options.valueUnit} />
        )}
      />
      {_.map(graphData[0], (value, key) => {
        if (key === argumentField) {
          return
        }
        if (_.startsWith(key, 'normal')) {
          return (
            <React.Fragment key={key}>
              <SplineSeries
                name={_.startCase(key)}
                valueField={key}
                argumentField={argumentField}
                seriesComponent={props => (
                  <DashLineWithCirclePoint
                    {...props}
                    optionstyle={MAP_COLOR_WITH_OBSERVATION[key]}
                  />
                )}
              />
            </React.Fragment>
          )
        }

        return (
          <React.Fragment key={key}>
            <SplineSeries
              name={_.startCase(key)}
              valueField={key}
              argumentField={argumentField}
              seriesComponent={props => (
                <LineWithCirclePoint
                  {...props}
                  optionstyle={MAP_COLOR_WITH_OBSERVATION[key]}
                />
              )}
            />
          </React.Fragment>
        )
      })}
      <EventTracker />
      <TooltipContent graphData={graphData} />
      {options.includeLegend ? (
        _.includes(
          options.standardSizeForResizeLegendToBottom,
          standardSize,
        ) ? (
            <Legend
              key={`legend-bottom${standardSize}`}
              position={'bottom'}
              markerComponent={(props: any) => <Marker {...props} />}
              rootComponent={LegendRoot}
              itemComponent={LegendItem}
            />
          ) : (
            <Legend
              key={`legend-right${standardSize}`}
              markerComponent={Marker}
            />
          )
      ) : null}
    </Chart>
  )
}

export const GraphArea: React.FunctionComponent<{
  graphData: any
  argumentField: string
  options?: any
  optionStyle?: any
}> = ({ graphData, argumentField, options, optionStyle }) => {
  if (_.isEmpty(graphData)) {
    return (
      <Typography
        variant='body1'
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          minHeight: 400,
        }}
      >
        {' '}
        No Data for display
      </Typography>
    )
  }
  return (
    <Chart
      height={optionStyle.height}
      width={optionStyle.width}
      data={graphData}
    >
      {options.ArgumentScale}
      {options.ValueScale}

      <ArgumentAxis />
      <ValueAxis
        // labelComponent={(props: any) => ValueLabel(props, options.valueUnit)}
        labelComponent={props => (
          <ValueLabel {...props} unit={_.get(options, 'valueUnit')} />
        )}
      />
      {_.map(graphData[0], (value, key) => {
        if (key === argumentField) {
          return
        }
        return (
          <React.Fragment key={key}>
            <CustomAreaSeries
              name={_.startCase(key)}
              valueField={key}
              argumentField={argumentField}
              optionStyle={optionStyle}
            // optionStyle={MAP_COLOR_WITH_OBSERVATION[key]}
            />
          </React.Fragment>
        )
      })}
      <EventTracker />
      <TooltipContent graphData={graphData} />
      {options.includeLegend ? <Legend /> : null}
    </Chart>
  )
}

const CustomAreaSeries: React.FunctionComponent<{
  name: string
  valueField: string
  argumentField: string
  optionStyle?: any
}> = ({ name, optionStyle, valueField, argumentField }) => {
  const Area = (props: any) => (
    <>
      <AreaSeries.Path
        {...props}
        color={_.get(optionStyle, 'color') || props.color}
        path={area()
          .x((props: any) => props.arg)
          .y1((props: any) => props.val)
          .y0((props: any) => props.startVal)
          .curve(curveCatmullRom)}
      />
      <ScatterSeries.Path
        {...props}
        pointComponent={Point(symbolCircle, {
          ...optionStyle,
          stroke: 'grey',
          strokeWidth: '2px',
        })}
      />
    </>
  )
  return (
    <AreaSeries
      name={name}
      valueField={valueField}
      argumentField={argumentField}
      seriesComponent={Area}
    />
  )
}

export default GraphBase
