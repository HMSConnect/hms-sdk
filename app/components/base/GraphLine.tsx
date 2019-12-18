import React, { useEffect, useState } from 'react'

import { SplineSeries } from '@devexpress/dx-react-chart'
import {
  ArgumentAxis,
  Chart,
  Legend,
  ValueAxis
} from '@devexpress/dx-react-chart-material-ui'
import * as _ from 'lodash'

const ValueLabel = (props: any) => {
  const { text, unit } = props
  return <ValueAxis.Label {...props} text={`${text} ${unit || ''}`} />
}

const GraphLine: React.FunctionComponent<{
  data: any[]
  argumentField: string
  ArgumentScale?: any
  ValueScale?: any
  valueUnit?: string
}> = ({
  data,
  argumentField,
  ArgumentScale: CustomArgumentScale,
  ValueScale: CustomValueScale,
  valueUnit
}) => {
  const [graph, setGraph] = useState<any[]>([])

  useEffect(() => {
    createDataGraph(data)
  }, [data])

  const createDataGraph = (data: any) => {
    const newValue: any[] = _.chain(data)
      .map(item => {
        const objectData = _.reduce(
          item.valueModal,
          (acc, v) => {
            const key = _.camelCase(v.code)
            return {
              ...acc,
              [key]: v.value
            }
          },
          {}
        )
        return {
          ...objectData,
          [argumentField]: item[argumentField]
        }
      })
      .value()

    newValue.push({
      diastolicBloodPressure: 70.31,
      issuedDate: new Date(2016, 9, 2),
      systolicBloodPressure: 100.33
    })
    newValue.push({
      diastolicBloodPressure: 85.31,
      issuedDate: new Date(2016, 9, 3),
      systolicBloodPressure: 130.33
    })
    newValue.push({
      diastolicBloodPressure: 80.31,
      issuedDate: new Date(2016, 9, 4),
      systolicBloodPressure: 114.33
    })
    newValue.push({
      diastolicBloodPressure: 90.31,
      issuedDate: new Date(2016, 9, 5),
      systolicBloodPressure: 124.33
    })
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
