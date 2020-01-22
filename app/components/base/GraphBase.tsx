import { EventTracker, SplineSeries } from '@devexpress/dx-react-chart'
import {
  AreaSeries,
  ArgumentAxis,
  Chart,
  Legend,
  LineSeries,
  ScatterSeries,
  Tooltip,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui'
import environment from '@environment'
import { Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { symbol, symbolDiamond } from 'd3-shape'
import * as _ from 'lodash'
import * as moment from 'moment'
import React from 'react'

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

const ValueLabel = (props: any) => {
  const { text, unit } = props
  return <ValueAxis.Label {...props} text={`${text} ${unit || ''}`} />
}

const ToolTipContentBase: React.FunctionComponent<any> = props => {
  return <>{Number(props.text).toFixed(2)}</>
}

const Point = (type: any, styles: any) => (props: any) => {
  const { arg, val, color } = props
  return (
    <path
      fill={color}
      transform={`translate(${arg} ${val})`}
      d={symbol().type(type)() as string}
      style={styles}
    />
  )
}

const DiamondPoint = Point(symbolDiamond, {
  stroke: 'white',
  strokeWidth: '1px',
})

const LineWithDiamondPoint = (props: any) => (
  <>
    <LineSeries.Path {...props} />
    <ScatterSeries.Path {...props} pointComponent={DiamondPoint} />
  </>
)

interface IGraphLineOption {
  includeLegend?: boolean
  ArgumentScale?: any
  ValueScale?: any
  valueUnit?: string
  type?: 'line' | 'area'
}

const TooltipContent: React.FunctionComponent<any> = ({
  graphData,
  argumentField,
}) => {
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
    includeLegend: false,
    type: 'line',
    valueUnit: '',
  },
}) => {
  const [graphData, setGraphData] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    prepareGraphData(data)
  }, [])

  const prepareGraphData = (data: any) => {
    const newValue: any[] = _.chain(data)
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

export const GraphLine: React.FunctionComponent<any> = ({
  graphData,
  argumentField,
  options,
  optionStyle,
}) => {
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
        labelComponent={props => (
          <ValueLabel {...props} unit={options.valueUnit} />
        )}
      />
      {_.map(graphData[0], (value, key) => {
        if (key === argumentField) {
          return
        }
        return (
          <React.Fragment key={key}>
            <SplineSeries
              name={_.startCase(key)}
              valueField={key}
              argumentField={argumentField}
              seriesComponent={LineWithDiamondPoint}
            />
          </React.Fragment>
        )
      })}
      <EventTracker />
      <TooltipContent graphData={graphData} argumentField={argumentField} />
      {options.includeLegend ? <Legend /> : null}
    </Chart>
  )
}

export const GraphArea: React.FunctionComponent<any> = ({
  graphData,
  argumentField,
  options,
  optionStyle,
}) => {
  const Area = (props: any) => (
    <AreaSeries.Path {...props} color={optionStyle.color || 'red'} />
  )

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
            <AreaSeries
              name={_.startCase(key)}
              valueField={key}
              argumentField={argumentField}
              seriesComponent={Area}
            />
          </React.Fragment>
        )
      })}
      <EventTracker />
      <TooltipContent graphData={graphData} argumentField={argumentField} />

      {options.includeLegend ? <Legend /> : null}
    </Chart>
  )
}

export default GraphBase
