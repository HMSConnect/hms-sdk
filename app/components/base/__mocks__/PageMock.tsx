import * as React from 'react'
export interface IStatelessPage<P = {}> extends React.SFC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}

const PageMock: IStatelessPage<{
  title?: any
}> = ({ title = 'Test' }) => {
  console.log('title: ', title)
  return (
    <div>
      <p>{title}</p>
    </div>
  )
}

export default PageMock
