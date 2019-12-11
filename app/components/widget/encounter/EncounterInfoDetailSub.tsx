import React from 'react'

import * as _ from 'lodash'
import * as moment from 'moment'
import { useRouter } from 'next/router'
import { Responsive, WidthProvider } from 'react-grid-layout'

import useEncounterResourceList from '../../hooks/useEncounterResourceList'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

import { Paper } from '@material-ui/core'
import DiagnosticReportCard from '../medical-records/DiagnosticReportCard'
import GridSelection from '../../base/GridSelection'

const createSelectorComponentM = _.memoize(createSelectorComponent)

const EncounterInfoDetailSub: React.FunctionComponent<any> = ({
  encounter
}) => {
  // const { data: _resourceList } = useEncounterResourceList(encounter.id)

  // const resourceList = _.filter(
  //   _resourceList,
  //   resource => resource.totalCount > 0
  // )
  const resourceList = ['diagnostic_report']

  const layouts = createLayouts(resourceList)

  return (
    <div>
      EncounterInfoDetailSub
      <br />
      <GridSelection
        defaultDimention='2x2'
        componentResources={{
          diagnostic_report: DiagnosticReportCard
        }}
      ></GridSelection>
      {/* <ResponsiveGridLayout
        className='layout'
        autoSize={true}
        layouts={{ lg: layouts }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        {createSelectorComponentM({ resourceList })}
      </ResponsiveGridLayout> */}
      {/* <EncounterTypeSelector encounter={encounter} /> */}
    </div>
  )
}

export default EncounterInfoDetailSub

function createLayouts(resourceList: any = {}): any[] {
  const layouts = [
    { w: 6, h: 2, x: 0, y: 0, i: 'diagnostic_report' },
    { w: 2, h: 2, x: 2, y: 2, i: 'care_plan' },
    { w: 2, h: 2, x: 4, y: 2, i: 'condition' },
    { w: 2, h: 2, x: 2, y: 0, i: 'medication_request' },
    { w: 3, h: 2, x: 4, y: 0, i: 'observation' },
    { w: 2, h: 2, x: 4, y: 4, i: 'procedure' }
  ]

  // const layouts = []

  // return _.map(resourceList, (item, i: number) => {
  //   console.log(i)
  //   const y = Math.ceil(Math.random() * 3) + 1
  //   return {
  //     x: (_.random(0, 5) * 2) % 12,
  //     y: Math.floor(i / 6) * y,
  //     w: 2,
  //     h: y,
  //     i: item.resourceType,
  //     static: Math.random() < 0.05
  //   }
  // })

  return layouts
}

function formatDateTime(date: any) {
  return moment.default(date).format('DD-MM-YYYY, HH:mm')
}

function createSelectorComponent({ resourceList }: any) {
  const { query } = useRouter()
  const params = {
    encounterId: query.encounterId,
    patientId: query.patientId
  }

  return _.map(resourceList, resourceType => {
    let CardInfo = DefaultInfoCard
    switch (resourceType) {
      // case 'allergy_intolerance':
      //   CardInfo = DefaultInfoCard
      // case 'claim':
      //   CardInfo = DefaultInfoCard
      //   break
      // case 'care_plan':
      //   CardInfo = CarePlanCard
      //   break
      // case 'condition':
      //   CardInfo = ConditionCard
      //   break
      case 'diagnostic_report':
        CardInfo = DiagnosticReportCard
        break
      // case 'goal':
      //   CardInfo = DefaultInfoCard
      //   break
      // case 'imaging_study':
      //   CardInfo = DefaultInfoCard
      //   break
      // case 'immunization':
      //   CardInfo = DefaultInfoCard
      //   break
      // case 'medication_request':
      //   CardInfo = MedicationRequestCard
      //   break
      // case 'observation':
      //   CardInfo = ObserationCard
      //   break
      // case 'organization':
      //   CardInfo = DefaultInfoCard
      //   break
      // case 'procedure':
      //   CardInfo = ProcedureCard
      //   break
    }
    return (
      <div
        key={resourceType}
        // style={{ width: 275, height: 400 }}
      >
        <CardInfo params={params} />
      </div>
    )
  })
}

const DefaultInfoCard: React.FunctionComponent<any> = ({ data }) => {
  return (
    <Paper style={{ padding: 4, height: '100%', overflowY: 'auto' }}>
      Mock Info
    </Paper>
  )
}
