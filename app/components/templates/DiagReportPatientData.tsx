import React, { useEffect, useState } from 'react'

import { ArgumentScale, SplineSeries, ValueScale } from '@devexpress/dx-react-chart'
import { ArgumentAxis, Chart, Legend, ValueAxis } from '@devexpress/dx-react-chart-material-ui'
import { makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import { scaleTime } from 'd3-scale'
import * as _ from 'lodash'

import TabGroup from '../base/TabGroup'
import TableBase from '../base/TableBase'



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
      diastolicBloodPressure: 70.31,
      issued: new Date(2016, 9, 2),
      systolicBloodPressure: 100.33
    })
    newValue.push({
      diastolicBloodPressure: 85.31,
      issued: new Date(2016, 9, 3),
      systolicBloodPressure: 130.33
    })
    newValue.push({
      diastolicBloodPressure: 80.31,
      issued: new Date(2016, 9, 4),
      systolicBloodPressure: 114.33
    })
    newValue.push({
      diastolicBloodPressure: 90.31,
      issued: new Date(2016, 9, 5),
      systolicBloodPressure: 124.33
    })
    setGraph(newValue)
  }
  return (
    <>
      {!loading ? (
        <>
          <TabGroup tabList={tab} onTabChange={handleTabChange} />
          <br />
          {_.isArray(data[0].valueModal) ? (
            <Paper>
              <Chart data={graph}>
                <ArgumentScale factory={scaleTime as any} />
                <ValueScale modifyDomain={() => [20, 200]} />

                <ArgumentAxis />
                <ValueAxis />

                <SplineSeries
                  name='Systolic'
                  valueField='systolicBloodPressure'
                  argumentField='issued'
                />
                <SplineSeries
                  name='Diastolic'
                  valueField='diastolicBloodPressure'
                  argumentField='issued'
                />
                <Legend />
              </Chart>
            </Paper>
          ) : (
            //   <TableBase
            //     entryList={data}
            //     id='dd'
            //     isLoading={loading}
            //     onEntrySelected={handleEntrySelected}
            //     tableCells={[
            //       {
            //         bodyCell: {
            //           align: 'center',
            //           id: 'diastolic',
            //           render: (data: any) => {
            //             return (
            //               <>
            //                 <Typography>
            //                   {_.find(
            //                     _.get(data, 'valueModal'),
            //                     entry =>
            //                       _.get(entry, 'code') ===
            //                       'Diastolic Blood Pressure'
            //                   )
            //                     ? Number(
            //                         _.find(
            //                           _.get(data, 'valueModal'),
            //                           entry =>
            //                             _.get(entry, 'code') ===
            //                             'Diastolic Blood Pressure'
            //                         ).value
            //                       ).toFixed(6)
            //                     : null}
            //                 </Typography>
            //               </>
            //             )
            //           }
            //         },
            //         headCell: {
            //           align: 'center',
            //           disablePadding: false,
            //           disableSort: true,
            //           id: 'diastolic',
            //           label: 'Diastolic'
            //         }
            //       },
            //       {
            //         bodyCell: {
            //           align: 'center',
            //           id: 'sistolic',
            //           render: (data: any) => {
            //             return (
            //               <Typography>
            //                 {_.find(
            //                   _.get(data, 'valueModal'),
            //                   entry =>
            //                     _.get(entry, 'code') ===
            //                     'Systolic Blood Pressure'
            //                 )
            //                   ? Number(
            //                       _.find(
            //                         _.get(data, 'valueModal'),
            //                         entry =>
            //                           _.get(entry, 'code') ===
            //                           'Systolic Blood Pressure'
            //                       ).value
            //                     ).toFixed(6)
            //                   : null}
            //               </Typography>
            //             )
            //           }
            //         },
            //         headCell: {
            //           align: 'center',
            //           disablePadding: false,
            //           disableSort: true,
            //           id: 'sistolic',
            //           label: 'Sistolic'
            //         }
            //       },
            //       {
            //         bodyCell: {
            //           align: 'center',
            //           id: 'issued',
            //           render: (data: any) => {
            //             return (
            //               <Typography>
            //                 {_.get(data, 'issued') || 'Unknow'}
            //               </Typography>
            //             )
            //           }
            //         },
            //         headCell: {
            //           align: 'center',
            //           disablePadding: false,
            //           disableSort: true,
            //           id: 'issued',
            //           label: 'Issued'
            //         }
            //       }
            //     ]}
            //   />
            // ) : (
            <Paper className={classes.tableRoot}>
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
            </Paper>
          )}
        </>
      ) : null}
    </>
  )
}

export default DiagReportPatientData
