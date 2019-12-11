import React, { useState } from 'react'

import { makeStyles, Theme } from '@material-ui/core'
import * as _ from 'lodash'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import SelectOption from './SelectOption'

const useStyles = makeStyles((theme: Theme) => ({
  cardResetButton: {
    position: 'absolute',
    right: 4,
    top: 4
  },
  searchFilter: {
    width: '100%'
  }
}))

const ResponsiveGridLayout = WidthProvider(Responsive)
type IDimention = '2x2' | '3x2' | '6x2'
type RestoreMedicalPanelRecord = {
  dimention: IDimention
  layout: any[]
} | null

const saveLayout = _.debounce((layout: any, dimention: string) => {
  window.localStorage.setItem(
    'medicalPanelRecord',
    JSON.stringify({ layout, dimention })
  )
  // console.log('save!!', dimention)
}, 500)

const GridSelection: React.FunctionComponent<{
  defaultDimention: IDimention
  componentResources: any
}> = ({ defaultDimention, componentResources: _componentResources }) => {
  const [dimention, setDimention] = useState<IDimention>(defaultDimention)
  const [layout, setLayout] = useState<any[]>(GRID_LAYOUT[dimention])
  const classes = useStyles()
  const componentResources = { ..._componentResources, default: DefaultContent }

  React.useEffect(() => {
    const restore = restoreLayout()
    if (restore) {
      setDimention(restore.dimention)
      setLayout(restore.layout)
    }
  }, [])

  const restoreLayout = (): RestoreMedicalPanelRecord => {
    const medicalPanelRecordStr = window.localStorage.getItem(
      'medicalPanelRecord'
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
    // console.log('saveAndSet', dimention, layout)
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
    event: React.ChangeEvent<{ name?: string; value: any }>
  ) => {
    const dimention = event.target.value as IDimention
    setDimention(dimention)
    saveAndSetLayout(_.merge(layout, GRID_LAYOUT[dimention]), dimention)
  }

  const handleLayoutChange = (currentLayout: any) => {
    saveAndSetLayout(_.merge(layout, currentLayout), dimention)
  }

  return (
    <div>
      <SelectOption
        label='Grid Selection'
        labelId='grid-selection-label'
        id='grid-selection'
        value={dimention}
        options={[
          { value: '2x2', label: '2x2' },
          { value: '3x2', label: '3x2' },
          { value: '6x2', label: '6x2' }
        ]}
        onChange={handleDimentionChange}
        classOption={classes.searchFilter}
      ></SelectOption>
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
            <GridLayout
              i={item.i}
              restoreComponentName={item.componentName}
              componentResources={componentResources}
              onComponentSelect={handleComponentSelect}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

const DefaultContent: React.FunctionComponent<any> = ({ i }) => {
  return <>{i}</>
}

const GridLayout: React.FunctionComponent<{
  i: string
  restoreComponentName: string | undefined
  componentResources: any
  onComponentSelect: any
}> = ({ i, restoreComponentName, componentResources, onComponentSelect }) => {
  const classes = useStyles()
  const [currentComponentName, setCurrentComponentName] = useState<
    string | null
  >(restoreComponentName || null)

  React.useEffect(() => {
    if (restoreComponentName) {
      setCurrentComponentName(restoreComponentName)
    }
  }, [restoreComponentName])

  const handleComponentSelect = (componentName: string) => {
    setCurrentComponentName(componentName)
    if (onComponentSelect) {
      onComponentSelect(componentName, i)
    }
  }

  const handleReset = () => {
    setCurrentComponentName(null)
    if (onComponentSelect) {
      onComponentSelect(undefined, i)
    }
  }

  const Component = currentComponentName
    ? componentResources[currentComponentName]
    : null

  return Component ? (
    <>
      <button onClick={handleReset} className={classes.cardResetButton}>
        RESET
      </button>
      <Component i={i} style={{ width: '100%', height: '100%' }} />
    </>
  ) : (
    <>
      <h2>Choose Card</h2>
      <ul>
        {_.map(componentResources, (Component: any, componentName: string) => {
          return (
            <li onClick={() => handleComponentSelect(componentName)}>
              {componentName}
            </li>
          )
        })}
      </ul>
    </>
  )
}

GridSelection.defaultProps = {
  defaultDimention: '2x2'
}

const GRID_LAYOUT = {
  '2x2': [
    { w: 2, h: 2, x: 0, y: 0, i: 'grid-1' },
    { w: 2, h: 2, x: 2, y: 0, i: 'grid-2' },
    { w: 2, h: 2, x: 4, y: 0, i: 'grid-3' },
    { w: 2, h: 2, x: 0, y: 2, i: 'grid-4' },
    { w: 2, h: 2, x: 2, y: 2, i: 'grid-5' },
    { w: 2, h: 2, x: 4, y: 2, i: 'grid-6' },
    { w: 2, h: 2, x: 0, y: 4, i: 'grid-7' },
    { w: 2, h: 2, x: 2, y: 4, i: 'grid-8' },
    { w: 2, h: 2, x: 4, y: 4, i: 'grid-9' }
  ],
  '3x2': [
    { w: 3, h: 2, x: 0, y: 0, i: 'grid-1' },
    { w: 3, h: 2, x: 3, y: 0, i: 'grid-2' },
    { w: 3, h: 2, x: 0, y: 2, i: 'grid-3' },
    { w: 3, h: 2, x: 3, y: 2, i: 'grid-4' },
    { w: 3, h: 2, x: 0, y: 4, i: 'grid-5' },
    { w: 3, h: 2, x: 3, y: 4, i: 'grid-6' },
    { w: 2, h: 2, x: 0, y: 6, i: 'grid-7' },
    { w: 2, h: 2, x: 2, y: 6, i: 'grid-8' },
    { w: 2, h: 2, x: 4, y: 6, i: 'grid-9' }
  ],
  '6x2': [
    { w: 6, h: 2, x: 0, y: 0, i: 'grid-1' },
    { w: 6, h: 2, x: 0, y: 2, i: 'grid-2' },
    { w: 6, h: 2, x: 0, y: 4, i: 'grid-3' },
    { w: 6, h: 2, x: 0, y: 6, i: 'grid-4' },
    { w: 6, h: 2, x: 3, y: 8, i: 'grid-5' },
    { w: 6, h: 2, x: 4, y: 10, i: 'grid-6' },
    { w: 6, h: 2, x: 0, y: 12, i: 'grid-7' },
    { w: 6, h: 2, x: 2, y: 14, i: 'grid-8' },
    { w: 6, h: 2, x: 4, y: 16, i: 'grid-9' }
  ]
}

export default GridSelection
