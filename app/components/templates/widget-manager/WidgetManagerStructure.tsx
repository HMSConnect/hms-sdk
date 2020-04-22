import AdaptiveInput from '@components/base/AdaptiveInput'
import SelectOption from '@components/base/SelectOption'
import { IWidgetPatameter } from '@config'
import {
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import _ from 'lodash'
import React from 'react'

const WidgetManagerStructure: React.FC<{
  structures: any
  selectedWidget: any
  onParameterChange: (name: string, type: string, value: any) => void
  type?: string
}> = ({
  structures,
  selectedWidget,
  onParameterChange,
  type = 'structure',
}) => {
  if (_.isEmpty(selectedWidget[type] || _.isEmpty(structures))) {
    return null
  }
  return (
    <>
      <Typography variant='h5'>Structure</Typography>
      <br />
      {_.map(selectedWidget[type], (parameter, indexHead) => (
        <React.Fragment key={`${parameter.value}structures${indexHead}`}>
          <Typography variant='body2'>{parameter.name}</Typography>
          {_.map(parameter.structure, (structureParameter, indexTail) => (
            <React.Fragment
              key={`${structureParameter.value}structures${indexTail}`}
            >
              <AdaptiveInput
                name={`${structureParameter.value}`}
                type={structureParameter.type}
                label={structureParameter.label}
                value={structures[parameter.name]}
                id={`${structureParameter.value} ${indexTail}`}
                onChange={(type: string, value: any) =>
                  onParameterChange(parameter.name, type, value)
                }
                choices={parameter.choices}
              />
            </React.Fragment>
          ))}
          <br />
          <br />
        </React.Fragment>
      ))}
    </>
  )
}

export default WidgetManagerStructure
