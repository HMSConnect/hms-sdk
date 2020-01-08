import * as React from 'react'

import * as _ from 'lodash'

const Highlighter: React.FunctionComponent<{
  highlightText: string
  text: string
}> = ({ highlightText, text }) => {
  const charecters = _.split(text, new RegExp(`(${highlightText})`, 'gi'))
  return (
    <>
      {_.map(charecters, (part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlightText.toLowerCase()
              ? { color: 'blue', backgroundColor: 'yellow' }
              : {}
          }
          data-testid={i + ''}
        >
          {part}
        </span>
      ))}
    </>
  )
}

export default Highlighter
