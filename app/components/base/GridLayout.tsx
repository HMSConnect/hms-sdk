import { Button, makeStyles, Paper, Theme } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import * as _ from 'lodash'
import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'

const useStyles = makeStyles((theme: Theme) => ({
  gridItem: {
    overflow: 'hidden',
  },
  gridSelectionLayout: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 8,
  },
  remove: {
    color: '#80808080',
    cursor: 'pointer',
    position: 'absolute',
    right: '2px',
    top: '2px',
    zIndex: 9999,
  },
  searchFilter: {
    width: 180,
  },
}))

const ResponsiveGridLayout = WidthProvider(Responsive)
const initialGridSelectorState = {
  breakpoint: undefined,
  cols: undefined,
  items: [],
}

function gridSelectorReducer(
  state: any = initialGridSelectorState,
  action: any,
) {
  switch (action.type) {
    case 'INIT':
      return action.payload
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: _.reject(state.items, { i: action.payload.i }),
      }
    case 'BREAKPOINT_CHANGE':
      return {
        ...state,
        ...action.payload,
      }
    case 'SAVE_LAYOUT':
      window.localStorage.setItem(
        action.payload.key,
        JSON.stringify(action.payload.items),
      )
      return state
    case 'RESET_LAYOUT':
      window.localStorage.setItem(
        action.payload.key,
        JSON.stringify(action.payload.items),
      )
      return action.payload
    default:
      return state
  }
}

const GridLayout: React.FunctionComponent<{
  ref?: any
  defaultCols?: any
  name?: string
  defaultItems?: any[]
  onItemAdd?: () => any
  renderItem?: (item: any) => any
}> = React.forwardRef(
  (
    {
      name = 'gridSelector',
      defaultCols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      defaultItems = [],
      onItemAdd,
      renderItem,
    },
    ref,
  ) => {
    const [{ items, layout, cols }, dispatch] = React.useReducer(
      gridSelectorReducer,
      initialGridSelectorState,
    )

    const classes = useStyles()

    // for passing child fn. to parent by reference
    React.useImperativeHandle(ref, () => ({ addItem }))

    React.useEffect(() => {
      const resotoreItems = restoreItems()
      dispatch({
        payload: {
          items: resotoreItems,
        },
        type: 'INIT',
      })
    }, [defaultItems])

    function restoreItems() {
      const layout: any = window.localStorage.getItem('layout')
      if (!_.isEmpty(layout)) {
        return _.map(JSON.parse(layout), (l: any) => {
          const component = _.find(defaultItems, { i: l.i })
          return {
            componentKey: component.componentKey,
            isCard: component.isCard,
            ...l,
          }
        })
      }
      return defaultItems
    }

    function addItem(newItem: any = {}) {
      const nextIdx = items.length

      const item = {
        h: 2,
        i: 'grid-' + nextIdx,
        w: 2,
        x: (items.length * 2) % (cols || 12),
        y: Infinity, // puts it at the bottom
        ...newItem,
      }

      dispatch({
        payload: item,
        type: 'ADD_ITEM',
      })
    }

    function saveLayout(layout: any) {
      dispatch({
        payload: {
          items: layout,
          key: 'layout',
        },
        type: 'SAVE_LAYOUT',
      })
    }

    function handleResetLayout() {
      dispatch({
        payload: {
          items: defaultItems,
          key: 'layout',
        },
        type: 'RESET_LAYOUT',
      })
    }

    function handleItemAdd() {
      if (onItemAdd) {
        // expect onItemAdd: boolean
        const isCancelItemAdd = onItemAdd()
        if (isCancelItemAdd) {
          return
        }
      }
      addItem()
    }

    function handleItemRemove(i: string) {
      dispatch({
        payload: { i },
        type: 'REMOVE_ITEM',
      })
    }

    function handleLayoutChange(layout: any) {
      saveLayout(layout)
      dispatch({
        payload: layout,
        type: 'LAYOUT_CHANGE',
      })
    }

    function handleBreakpointChange(newBreakpoint: string, newCols: number) {
      // console.log('handle breakpoint change', newBreakpoint, newCols)
      dispatch({
        payload: {
          breakpoint: newBreakpoint,
          cols: newCols,
        },
        type: 'BREAKPOINT_CHANGE',
      })
    }

    function handleWidthChange(
      containerWidth: number,
      margin: [number, number],
      cols: number,
      containerPadding: [number, number],
    ) {
      // console.log('handle width change', containerWidth)
      // console.log('margin :', margin);
      // console.log('cols :', cols);
      // console.log('containerPadding :', containerPadding);
    }

    function renderRemoveComponent(item: any) {
      return (
        <span
          className={classes.remove}
          onClick={() => handleItemRemove(item.i)}
        >
          <CloseIcon fontSize={'small'} />
        </span>
      )
    }

    function createItem(item: any) {
      let renderComponent = <div key={item.i}>{item.i}</div>
      if (renderItem) {
        const SelectorComponent = renderItem(item)
        renderComponent = <SelectorComponent />
      } else {
        renderComponent = <>{item.i}</>
      }

      if (item.isCard) {
        return (
          <Paper key={item.i} className={classes.gridItem}>
            {renderComponent}
            {renderRemoveComponent(item)}
          </Paper>
        )
      }

      return (
        <div key={item.i} className={classes.gridItem}>
          {renderComponent}
          {renderRemoveComponent(item)}
        </div>
      )
    }

    return (
      <div data-testid='grid-selector'>
        <div className={classes.gridSelectionLayout}>
          <Button
            size='small'
            variant='outlined'
            onClick={handleResetLayout}
            style={{ marginRight: 8 }}
          >
            RESET
          </Button>
          <Button size='small' variant='outlined' onClick={handleItemAdd}>
            Add +{' '}
          </Button>
        </div>
        <ResponsiveGridLayout
          className='layout'
          // margin={[10, 10]}
          // containerPadding={[10, 10]}
          layouts={{ lg: items }} // If not provided, use data-grid props on children
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={defaultCols}
          rowHeight={50}
          onLayoutChange={handleLayoutChange}
          onBreakpointChange={handleBreakpointChange}
          onWidthChange={handleWidthChange}
        >
          {items.map((item: any) => createItem(item))}
        </ResponsiveGridLayout>
      </div>
    )
  },
)

export default GridLayout
