import * as React from 'react'
import useInfinitScroll from '../useInfinitScroll'

const ComponentUseInfinitScrollMock: React.FunctionComponent<any> = ({
  lazyFunction,
}) => {
  const { data } = useInfinitScroll(null, lazyFunction)
  return <>Test</>
}

export default ComponentUseInfinitScrollMock
