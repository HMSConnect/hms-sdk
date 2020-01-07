import React, { useEffect, useState } from 'react'

import GraphLine from '@components/base/GraphLine'
import TabGroup, { ITabList } from '@components/base/TabGroup'
import TableBase from '@components/base/TableBase'
import { ArgumentScale, ValueScale } from '@devexpress/dx-react-chart'
import { makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import { scaleTime } from 'd3-scale'
import * as _ from 'lodash'

const useStyles = makeStyles((theme: Theme) => ({
  tableRoot: {
    height: '70vh',
    overflowY: 'scroll',
  },
}))
const DiagReportPatientData: React.FunctionComponent<{
  diagReportList: any[]
}> = ({ diagReportList }) => {
  const [tab, setTab] = useState<any[]>([])

  const [data, setData] = useState<any[]>([])
  const classes = useStyles()

  useEffect(() => {
    if (!_.isEmpty(diagReportList)) {
      const resultCodeGroup: any = _.chain(diagReportList)
        .map(data => data.result)
        .flatten()
        .groupBy('codeText')
        .value()
      const tabList: ITabList[] = _.map(resultCodeGroup, (value, key) => {
        return { type: key, totalCount: 0 }
      })
      const newData = _.find(
        resultCodeGroup,
        (value, key) => key === tabList[0].type,
      )
      setTab(tabList)
      setData(newData)
    }
  }, [diagReportList])

  const handleTabChange = (selectedValue: string) => {
    const resultCodeGroup = _.chain(diagReportList)
      .map(data => data.result)
      .flatten()
      .groupBy('codeText')
      .value()
    const newData = _.find(
      resultCodeGroup,
      (value, key) => key === selectedValue,
    )
    if (newData) {
      setData(newData)
    }
  }

  const handleEntrySelected = (
    event: React.MouseEvent,
    selectedEncounter: any,
  ) => {
    // TODO handleEntrySelected
  }

  if (!_.get(data[0], 'valueModal')) {
    return <></>
  }

  return (
    <>
      <TabGroup tabList={tab} onTabChange={handleTabChange} />
      <br />

      {_.isArray(data[0].valueModal) ? (
        <Paper>
          <GraphLine
            data={data}
            ArgumentScale={<ArgumentScale factory={scaleTime as any} />}
            ValueScale={<ValueScale modifyDomain={() => [20, 200]} />}
            argumentField='issuedDate'
            valueUnit='mmHg'
          />
        </Paper>
      ) : (
        <Paper className={classes.tableRoot}>
          <TableBase
            entryList={data}
            id='dd'
            isLoading={false}
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
                  },
                },
                headCell: {
                  align: 'center',
                  disablePadding: false,
                  disableSort: true,
                  id: 'value',
                  label: 'Value',
                },
              },
              {
                bodyCell: {
                  align: 'center',
                  id: 'issued',
                },
                headCell: {
                  align: 'center',
                  disablePadding: false,
                  disableSort: true,
                  id: 'issued',
                  label: 'Issued',
                },
              },
            ]}
          />
        </Paper>
      )}
    </>
  )
}

export default DiagReportPatientData
