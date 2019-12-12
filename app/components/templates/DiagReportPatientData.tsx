import React, { useEffect, useState } from 'react'

import { makeStyles, Theme, Typography } from '@material-ui/core'
import * as _ from 'lodash'
import * as moment from 'moment'

import environment from '../../config'
import TabGroup from '../base/TabGroup'
import TableBase from '../base/TableBase'



const useStyles = makeStyles((theme: Theme) => ({
  tableRoot: {
    height: '50vh',
    overflowY: 'scroll'
  }
}))
const DiagReportPatientData: React.FunctionComponent<{
  diagReportList: any[]
}> = ({ diagReportList }) => {
  const [tab, setTab] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<any[]>([])

  const classes = useStyles()

  useEffect(() => {
    if (!_.isEmpty(diagReportList)) {
      setLoading(true)
      const resultCodeGroup: any = _.chain(diagReportList)
        .map(data => data.result)
        .flatten()
        .groupBy('code.text')
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
      setLoading(false)
    }
  }, [diagReportList])

  const handleTabChange = (selectedValue: string) => {
    const resultCodeGroup = _.chain(diagReportList)
      .map(data => data.result)
      .flatten()
      .groupBy('code.text')
      .value()

    setLoading(true)

    const newData = _.find(
      resultCodeGroup,
      (value, key) => key === selectedValue
    )
    if (newData) {
      setData(newData)
    }

    setLoading(false)
  }

  const handleEntrySelected = (
    event: React.MouseEvent,
    selectedEncounter: any
  ) => {
    console.log('handleEntrySelected :')
  }

  return (
    <>
      {!loading ? (
        <>
          <TabGroup tabList={tab} onTabChange={handleTabChange} />
          <div className={classes.tableRoot}>
            {data[0].component ? (
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
                                _.get(data, 'component'),
                                entry =>
                                  _.get(entry, 'code.text') ===
                                  'Diastolic Blood Pressure'
                              )
                                ? Number(_.find(
                                    _.get(data, 'component'),
                                    entry =>
                                      _.get(entry, 'code.text') ===
                                      'Diastolic Blood Pressure'
                                  ).valueQuantity.value).toFixed(6)
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
                              _.get(data, 'component'),
                              entry =>
                                _.get(entry, 'code.text') ===
                                'Systolic Blood Pressure'
                            )
                              ? Number(_.find(
                                  _.get(data, 'component'),
                                  entry =>
                                    _.get(entry, 'code.text') ===
                                    'Systolic Blood Pressure'
                                ).valueQuantity.value).toFixed(6)
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
                            {_.get(data, 'issued')
                              ? moment
                                  .default(_.get(data, 'issued'))
                                  .format(environment.localFormat.dateTime)
                              : 'Unknow'}
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
                            {_.get(data, 'valueQuantity.value') ? Number(_.get(data, 'valueQuantity.value')).toFixed(6) : 'Unknow'}{' '}
                            {_.get(data, 'valueQuantity.unit')}
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
                            {_.get(data, 'issued')
                              ? moment
                                  .default(_.get(data, 'issued'))
                                  .format(environment.localFormat.dateTime)
                              : 'Unknow'}
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
