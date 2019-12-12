import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title
} from '@devexpress/dx-react-chart-material-ui'
import {
  ArgumentScale,
  ValueScale,
  Animation,
  ScaleObject
} from '@devexpress/dx-react-chart'
import { makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import * as _ from 'lodash'
import * as moment from 'moment'
import React, { useEffect, useState } from 'react'
import environment from '../../config'
import TabGroup from '../base/TabGroup'
import TableBase from '../base/TableBase'
import { scaleTime } from 'd3-scale'

const useStyles = makeStyles((theme: Theme) => ({
  tableRoot: {
    height: '70vh',
    overflowY: 'scroll'
  }
}))
const DiagReportPatientData: React.FunctionComponent<{
  diagReportList: any[]
}> = ({ diagReportList }) => {
  const [tab, setTab] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<any[]>([])
  const [graph, setGraph] = useState<any[]>([])
  const classes = useStyles()

  useEffect(() => {
    if (!_.isEmpty(diagReportList)) {
      setLoading(true)
      const resultCodeGroup: any = _.chain(diagReportList)
        .map(data => data.result)
        .flatten()
        .groupBy('codeText')
        .value()
      const tabList: any[] = _.map(resultCodeGroup, (value, key) => {
        return { type: key, totalCount: 0 }
      })
      const newData = _.find(
        resultCodeGroup,
        (value, key) => key === tabList[0].type
      )
      setTab(tabList)
      setData(newData)
      createDataGraph(newData)
      setLoading(false)
    }
  }, [diagReportList])

  const handleTabChange = (selectedValue: string) => {
    const resultCodeGroup = _.chain(diagReportList)
      .map(data => data.result)
      .flatten()
      .groupBy('codeText')
      .value()

    setLoading(true)

    const newData = _.find(
      resultCodeGroup,
      (value, key) => key === selectedValue
    )
    if (newData) {
      setData(newData)
      if (_.isArray(_.get(newData[0], 'valueModal'))) {
        createDataGraph(newData)
      }
    }

    setLoading(false)
  }

  const handleEntrySelected = (
    event: React.MouseEvent,
    selectedEncounter: any
  ) => {
    console.log('handleEntrySelected :')
    // TODO handleEntrySelected
  }

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
          issued: item.issuedDate
        }
      })
      .value()
    newValue.push({
      diastolicBloodPressure: 75.31,
      issued: new Date(),
      systolicBloodPressure: 111.33
    })
    setGraph(newValue)
  }
  return (
    <>
      {!loading ? (
        <>
          <TabGroup tabList={tab} onTabChange={handleTabChange} />
          <div className={classes.tableRoot}>
            {_.isArray(data[0].valueModal) ? (
              //   <Paper>
              //     <Chart data={graph}>
              //       <ArgumentScale factory={scaleTime} />
              //       <ArgumentAxis />
              //       <ValueAxis />

              //       <LineSeries
              //         valueField='diastolicBloodPressure'
              //         argumentField='issued'
              //       />
              //       <LineSeries
              //         valueField='systolicBloodPressure'
              //         argumentField='issued'
              //       />
              //     </Chart>
              //   </Paper>
              // ) : (
              <TableBase
                entryList={data}
                id='dd'
                isLoading={loading}
                onEntrySelected={handleEntrySelected}
                tableCells={[
                  {
                    bodyCell: {
                      align: 'center',
                      id: 'diastolic',
                      render: (data: any) => {
                        return (
                          <>
                            <Typography>
                              {_.find(
                                _.get(data, 'valueModal'),
                                entry =>
                                  _.get(entry, 'code') ===
                                  'Diastolic Blood Pressure'
                              )
                                ? Number(
                                    _.find(
                                      _.get(data, 'valueModal'),
                                      entry =>
                                        _.get(entry, 'code') ===
                                        'Diastolic Blood Pressure'
                                    ).value
                                  ).toFixed(6)
                                : null}
                            </Typography>
                          </>
                        )
                      }
                    },
                    headCell: {
                      align: 'center',
                      disablePadding: false,
                      disableSort: true,
                      id: 'diastolic',
                      label: 'Diastolic'
                    }
                  },
                  {
                    bodyCell: {
                      align: 'center',
                      id: 'sistolic',
                      render: (data: any) => {
                        return (
                          <Typography>
                            {_.find(
                              _.get(data, 'valueModal'),
                              entry =>
                                _.get(entry, 'code') ===
                                'Systolic Blood Pressure'
                            )
                              ? Number(
                                  _.find(
                                    _.get(data, 'valueModal'),
                                    entry =>
                                      _.get(entry, 'code') ===
                                      'Systolic Blood Pressure'
                                  ).value
                                ).toFixed(6)
                              : null}
                          </Typography>
                        )
                      }
                    },
                    headCell: {
                      align: 'center',
                      disablePadding: false,
                      disableSort: true,
                      id: 'sistolic',
                      label: 'Sistolic'
                    }
                  },
                  {
                    bodyCell: {
                      align: 'center',
                      id: 'issued',
                      render: (data: any) => {
                        return (
                          <Typography>
                            {_.get(data, 'issued') || 'Unknow'}
                          </Typography>
                        )
                      }
                    },
                    headCell: {
                      align: 'center',
                      disablePadding: false,
                      disableSort: true,
                      id: 'issued',
                      label: 'Issued'
                    }
                  }
                ]}
              />
            ) : (
              <TableBase
                entryList={data}
                id='dd'
                isLoading={loading}
                onEntrySelected={handleEntrySelected}
                tableCells={[
                  {
                    bodyCell: {
                      align: 'center',
                      id: 'value',
                      render: (data: any) => {
                        return (
                          <Typography>
                            {_.get(data, 'valueModal') || 'Unknow'}{' '}
                            {_.get(data, 'unit') || 'Unknow'}
                          </Typography>
                        )
                      }
                    },
                    headCell: {
                      align: 'center',
                      disablePadding: false,
                      disableSort: true,
                      id: 'value',
                      label: 'Value'
                    }
                  },
                  {
                    bodyCell: {
                      align: 'center',
                      id: 'issued',
                      render: (data: any) => {
                        return (
                          <Typography>
                            {_.get(data, 'issued') || 'Unknow'}
                          </Typography>
                        )
                      }
                    },
                    headCell: {
                      align: 'center',
                      disablePadding: false,
                      disableSort: true,
                      id: 'issued',
                      label: 'Issued'
                    }
                  }
                ]}
              />
            )}
          </div>
        </>
      ) : null}
    </>
  )
}

export default DiagReportPatientData
