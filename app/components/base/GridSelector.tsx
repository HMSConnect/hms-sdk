import React, { useState } from 'react'

import { makeStyles, Theme } from '@material-ui/core'
import * as _ from 'lodash'
import { Responsive, WidthProvider } from 'react-grid-layout'
import GridCardSelector from './GridCardSelector'
import SelectOption from './SelectOption'
import { sendMessage } from '@utils'

const useStyles = makeStyles((theme: Theme) => ({
  gridSelectionLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  searchFilter: {
    width: 180,
  },
}))

const GRID_LAYOUT = {
  '1xN': [
    { w: 6, h: 2, x: 0, y: 0, i: 'grid-1' },
    { w: 6, h: 2, x: 0, y: 2, i: 'grid-2' },
    { w: 6, h: 2, x: 0, y: 4, i: 'grid-3' },
    { w: 6, h: 2, x: 0, y: 6, i: 'grid-4' },
    { w: 6, h: 2, x: 3, y: 8, i: 'grid-5' },
    { w: 6, h: 2, x: 4, y: 10, i: 'grid-6' },
    { w: 6, h: 2, x: 0, y: 12, i: 'grid-7' },
    { w: 6, h: 2, x: 2, y: 14, i: 'grid-8' },
    { w: 6, h: 2, x: 4, y: 16, i: 'grid-9' },
  ],
  '2xN': [
    { w: 3, h: 2, x: 0, y: 0, i: 'grid-1' },
    { w: 3, h: 2, x: 3, y: 0, i: 'grid-2' },
    { w: 3, h: 2, x: 0, y: 2, i: 'grid-3' },
    { w: 3, h: 2, x: 3, y: 2, i: 'grid-4' },
    { w: 3, h: 2, x: 0, y: 4, i: 'grid-5' },
    { w: 3, h: 2, x: 3, y: 4, i: 'grid-6' },
    { w: 3, h: 2, x: 0, y: 6, i: 'grid-7' },
    { w: 3, h: 2, x: 3, y: 6, i: 'grid-8' },
    { w: 3, h: 2, x: 0, y: 8, i: 'grid-9' },
  ],
  '3x3': [
    { w: 2, h: 2, x: 0, y: 0, i: 'grid-1' },
    { w: 2, h: 2, x: 2, y: 0, i: 'grid-2' },
    { w: 2, h: 2, x: 4, y: 0, i: 'grid-3' },
    { w: 2, h: 2, x: 0, y: 2, i: 'grid-4' },
    { w: 2, h: 2, x: 2, y: 2, i: 'grid-5' },
    { w: 2, h: 2, x: 4, y: 2, i: 'grid-6' },
    { w: 2, h: 2, x: 0, y: 4, i: 'grid-7' },
    { w: 2, h: 2, x: 2, y: 4, i: 'grid-8' },
    { w: 2, h: 2, x: 4, y: 4, i: 'grid-9' },
  ],
}

const ResponsiveGridLayout = WidthProvider(Responsive)
type IDimention = '3x3' | '2xN' | '1xN'
type RestoreMedicalPanelRecord = {
  dimention: IDimention
  layout: any[]
} | null

export const saveLayout = _.debounce((layout: any, dimention: string) => {
  // debounce handle for call many time
  window.localStorage.setItem(
    'medicalPanelRecord',
    JSON.stringify({ layout, dimention }),
  )
  // console.log('save!!', dimention)
}, 500)

const GridSelector: React.FunctionComponent<{
  defaultDimention?: IDimention
  componentResource: any
}> = ({ defaultDimention = '1xN', componentResource }) => {
  const [dimention, setDimention] = useState<IDimention>(defaultDimention)
  const [layout, setLayout] = useState<any[]>(GRID_LAYOUT[dimention])
  const classes = useStyles()

  React.useEffect(() => {
    const restore = restoreLayout()
    if (restore) {
      setDimention(restore.dimention)
      setLayout(restore.layout)
    }
  }, [])

  const restoreLayout = (): RestoreMedicalPanelRecord => {
    const medicalPanelRecordStr = window.localStorage.getItem(
      'medicalPanelRecord',
    )
    const medicalPanelRecord = medicalPanelRecordStr
      ? (JSON.parse(medicalPanelRecordStr) as RestoreMedicalPanelRecord)
      : null

    if (medicalPanelRecord && medicalPanelRecord.dimention === dimention) {
      window.localStorage.removeItem('medicalPanelRecord')
    }
    return medicalPanelRecord
  }

  const saveAndSetLayout = (layout: any, dimention: string) => {
    saveLayout(layout, dimention)
    setLayout(layout)
  }

  const handleComponentSelect = (componentName: string, layoutId: string) => {
    const _layout = _.map(layout, l => {
      if (l.i === layoutId) {
        l.componentName = componentName
      }
      return l
    })
    saveAndSetLayout(_layout, dimention)
  }

  const handleDimentionChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>,
  ) => {
    const dimention = event.target.value as IDimention
    setDimention(dimention)
    saveAndSetLayout(_.merge(layout, GRID_LAYOUT[dimention]), dimention)
    sendMessage({
      message: 'handleDimentionChange',
      params: {
        dimention,
      },
    })
  }

  const handleLayoutChange = (currentLayout: any) => {
    saveAndSetLayout(_.merge(layout, currentLayout), dimention)
  }

  return (
    <div data-testid='grid-selector'>
      <div className={classes.gridSelectionLayout}>
        <SelectOption
          label='Grid Selection'
          labelId='grid-selection-label'
          id='grid-selection'
          value={dimention}
          options={[
            { value: '3x3', label: '3x3' },
            { value: '2xN', label: '2xN' },
            { value: '1xN', label: '1xN' },
          ]}
          onChange={handleDimentionChange}
          classOption={classes.searchFilter}
        ></SelectOption>
      </div>
      <ResponsiveGridLayout
        key={dimention}
        className='layout'
        autoSize={true}
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        onLayoutChange={handleLayoutChange}
      >
        {layout.map((item: any) => (
          <div key={item.i}>
            <GridCardSelector
              i={item.i}
              restoreComponentName={item.componentName}
              componentResource={componentResource}
              onComponentSelect={handleComponentSelect}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default GridSelector
