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

const WidgetManagerParameter: React.FC<{
  parameters: any
  selectedWidget: any
  onParameterChange: (type: string, value: any) => void
  label?: string
  type?: string
}> = ({
  parameters,
  selectedWidget,
  onParameterChange,
  label = 'Query Params',
  type = 'queryParams',
}) => {
  const renderInput = (parameter: IWidgetPatameter, key: string) => {
    switch (parameter.type) {
      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={parameters[parameter.value]}
                onChange={event =>
                  onParameterChange(parameter.value, event.target.checked)
                }
                color='primary'
              />
            }
            label={parameter.label}
          />
        )
      case 'number':
        return (
          <TextField
            id={key}
            label={parameter.label}
            fullWidth
            variant='outlined'
            value={parameters[parameter.value]}
            onChange={event =>
              onParameterChange(parameter.value, event.target.value)
            }
            type='number'
          />
        )
      case 'options':
        if (!parameter.choices) {
          return
        }
        return (
          <SelectOption
            label={parameter.label}
            labelId={key}
            id={key}
            value={parameters[parameter.value]}
            options={parameter.choices}
            onChange={(
              event: React.ChangeEvent<{ name?: string; value: unknown }>,
            ) => {
              onParameterChange(parameter.value, event.target.value)
            }}
            fullwidth
          />
        )
      case 'text':
        return (
          <TextField
            id={key}
            label={parameter.label}
            fullWidth
            variant='outlined'
            value={parameters[parameter.value]}
            onChange={event =>
              onParameterChange(parameter.value, event.target.value)
            }
          />
        )
      default:
        return (
          <TextField
            id={key}
            label={parameter.label}
            fullWidth
            variant='outlined'
            value={parameters[parameter.value]}
            onChange={event =>
              onParameterChange(parameter.value, event.target.value)
            }
          />
        )
    }
  }
  if (_.isEmpty(selectedWidget[type])) {
    return null
  }
  return (
    <>
      <Typography variant='h5'>{label}</Typography>
      <br />
      {_.map(selectedWidget[type], (parameter, index) => (
        <React.Fragment key={`${parameter.value}parameters${index}`}>
          {/* {renderInput(parameter, `${type}outlined-basic${index}`)} */}
          <AdaptiveInput
            name={parameter.value}
            type={parameter.type}
            label={parameter.label}
            value={parameters}
            id={`${parameter.value} ${index}`}
            onChange={onParameterChange}
            choices={parameter.choices}
          />
          <br />
          <br />
        </React.Fragment>
      ))}
    </>
  )
}

export default WidgetManagerParameter
