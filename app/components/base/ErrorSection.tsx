import * as React from 'react'

const ErrorSection: React.FunctionComponent<any> = ({ error }) => {
  return <div>ERR: {error}.</div>
}

export default ErrorSection