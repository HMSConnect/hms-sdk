import * as React from 'react'

import useWindowSize from '@components/hooks/useWindowSize'
import { Button, makeStyles, Theme, Fab, Icon } from '@material-ui/core'
import { fromEvent, interval } from 'rxjs'
import { debounce, filter, map } from 'rxjs/operators'
import ReactGa from 'react-ga'
import GridOnIcon from '@material-ui/icons/GridOn'
import GridOffIcon from '@material-ui/icons/GridOff'

const useStyles = makeStyles((theme: Theme) => ({
  gridCell: (props: any) => ({
    background: 'rgba(0,0,0,0.12)',
    border: '1px solid black',
    height: props.height || 0,
    width: props.width || 0,
  }),
  gridContainer: {
    '&:hover': {
      backgroundColor: 'rgba(144, 202, 249, 0.75);',
    },
    position: 'absolute',
    zIndex: 100000,
  },
  showGridButton: {
    bottom: '10px',
    position: 'fixed',
    right: '10px',
    zIndex: 100010,
  },
}))

const MouseTrack: React.FunctionComponent<{
  category: string
  gridWidth?: number
  gridHeight?: number
}> = ({ category, children, gridWidth = 200, gridHeight = 200 }) => {
  const windowSize = useWindowSize()
  const [coord, setCoord] = React.useState({ x: undefined, y: undefined })
  const [bodySize, setBodySize] = React.useState({
    height: 0,
    width: 0,
  })
  const [displayGridLayout, setDisplayGridLayout] = React.useState(false)
  const classes = useStyles({
    height: gridHeight,
    width: gridWidth,
  })

  React.useEffect(() => {
    setBodySize({
      height: document.body.clientHeight,
      width: document.body.clientWidth,
    })
  }, [document.body.clientHeight, document.body.clientWidth])
  React.useEffect(() => {
    // const move = new Subject
    // console.log('useEffect')
    const move$ = fromEvent(document, 'mousemove')
    const mouseSub = move$
      .pipe(
        debounce(() => interval(1000)),
        map((x: any) => {
          // const minX = (bodySize.width || 0) / 12
          // const minY = (bodySize.height || 0) / 12
          return {
            x: Math.floor(x.pageX / gridWidth),
            y: Math.floor(x.pageY / gridHeight),
          }
        }),
        filter((x: any) => {
          return x.x !== coord.x || x.y !== coord.y
        }),
      )
      .subscribe(x => {
        ReactGa.event({
          category,
          action: 'mouse_move',
          label: `(x,y), (${x.x},${x.y})__${windowSize.standardSize} `,
        })
        setCoord(prev => {
          return { x: x.x, y: x.y }
        })
      })

    return () => {
      // console.log('unsub')
      mouseSub.unsubscribe()
    }
  })

  const handleClickGridLayout = (event: any) => {
    setDisplayGridLayout(prev => !prev)
  }
  const renderGrid = React.useMemo(() => {
    const grid = []
    const minNumCellx = Math.round((bodySize.width || 0) / gridWidth)
    const minNumCelly = Math.round((bodySize.height || 0) / gridHeight)
    const minX = (bodySize.width || 0) / 12
    const minY = (bodySize.height || 0) / 12
    // for (let i = 0; i < 12; i++) {
    //   for (let j = 0; j < 12; j++) {
    //     grid.push(
    //       <div
    //         className={classes.gridContainer}
    //         style={{ top: `${j * minY}px`, left: `${i * minX}px` }}
    //         key={`grid-layout-(${i},${j})`}
    //       >
    //         <div className={classes.gridCell}></div>
    //       </div>,
    //     )
    //   }
    // }
    for (let i = 0; i < minNumCellx; i++) {
      for (let j = 0; j < minNumCelly; j++) {
        grid.push(
          <div
            className={classes.gridContainer}
            style={{ top: `${j * gridWidth}px`, left: `${i * gridHeight}px` }}
            key={`grid-layout-(${i},${j})`}
          >
            <div className={classes.gridCell}>
              {i},{j}
            </div>
          </div>,
        )
      }
    }
    return grid
  }, [bodySize.width, bodySize.height])

  return (
    <>
      {displayGridLayout
        ? renderGrid.map((Component: any, index: number) => {
            return Component
          })
        : null}
      <div className={classes.showGridButton}>
        <Fab
          color='secondary'
          aria-label='edit'
          onClick={handleClickGridLayout}
        >
          {displayGridLayout ? <GridOffIcon /> : <GridOnIcon />}
        </Fab>
      </div>
      {children}
    </>
  )
}

export default MouseTrack
