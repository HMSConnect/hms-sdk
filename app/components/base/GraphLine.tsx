import React, { useEffect, useState } from 'react'

import { SplineSeries } from '@devexpress/dx-react-chart'
import {
  ArgumentAxis,
  Chart,
  Legend,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui'
import * as _ from 'lodash'

const ValueLabel = (props: any) => {
  const { text, unit } = props
  return <ValueAxis.Label {...props} text={`${text} ${unit || ''}`} />
}

const GraphLine: React.FunctionComponent<{
  data: any[]
  argumentField: string
  valueField?: string
  ArgumentScale?: any
  ValueScale?: any
  valueUnit?: string
}> = ({
  data,
  argumentField,
  valueField,
  ArgumentScale: CustomArgumentScale,
  ValueScale: CustomValueScale,
  valueUnit,
}) => {
  const [graph, setGraph] = useState<any[]>([])

  useEffect(() => {
    createDataGraph(data)
  }, [data])

  const createDataGraph = (data: any) => {
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
    setGraph(newValue)
  }

  if (_.isEmpty(data)) {
    return <></>
  }

  return (
    <>
      <Chart data={graph}>
        {CustomArgumentScale}
        {CustomValueScale}

        <ArgumentAxis />
        <ValueAxis
          labelComponent={props => <ValueLabel {...props} unit={valueUnit} />}
        />
        {_.map(graph[0], (value, key) => {
          if (key === argumentField) {
            return
          }
          return (
            <React.Fragment key={key}>
              <SplineSeries
                name={_.startCase(key)}
                valueField={key}
                argumentField={argumentField}
              />
            </React.Fragment>
          )
        })}
        <Legend />
      </Chart>
    </>
  )
}

export default GraphLine
