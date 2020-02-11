import * as React from 'react'

import {
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import SelectOption, { IOptionItem } from './SelectOption'
import isEmpty from 'lodash/isEmpty'
type AdaptiveInputType =
  | 'text'
  | 'number'
  | 'choice'
  | 'boolean'
  // | 'date'
  | 'options'

export interface IAdaptiveInput {
  type: AdaptiveInputType
  name: string
  label: string
  choices?: IOptionItem[]
  keyValue?: string
}

const AdaptiveInput: React.FunctionComponent<{
  name: string
  type: AdaptiveInputType
  label: string
  value: any
  id: string
  choices?: IOptionItem[]
  keyValue?: string
  onChange: (type: string, value: any) => void
}> = ({
  name,
  type,
  label,
  value = {},
  id,
  onChange,
  choices,
  keyValue = name,
}) => {
  switch (type) {
    // case 'date':
    //   return null
    // <KeyboardDatePicker
    //   disableToolbar
    //   variant='inline'
    //   format={environment.localFormat.date}
    //   margin='normal'
    //   id='date-picker-inline'
    //   label='Date picker inline'
    //   value={selectedDate}
    //   onChange={handleDateChange}
    //   KeyboardButtonProps={{
    //     'aria-label': 'change date',
    //   }}
    // />
    case 'options':
      if (!choices || isEmpty(choices)) {
        return <Typography variant='body2'>Need choices..</Typography>
      }
      return (
        <SelectOption
          label={label}
          labelId={id}
          id={id}
          value={value[keyValue]}
          options={choices}
          data-testid={`adaptive-input-select-option-${name}`}
          onChange={(
            event: React.ChangeEvent<{ name?: string; value: unknown }>,
          ) => {
            onChange(name, event.target.value)
          }}
          fullwidth
        />
      )
    case 'boolean':
      return (
        <FormControlLabel
          control={
            <Switch
              checked={value[keyValue]}
              onChange={event => onChange(name, event.target.checked)}
              color='primary'
              data-testid={`adaptive-input-boolean-${name}`}
            />
          }
          label={label}
        />
      )
    case 'number':
      return (
        <TextField
          id={id}
          label={label}
          fullWidth
          variant='outlined'
          value={value[keyValue]}
          onChange={event => onChange(name, event.target.value)}
          type='number'
          data-testid={`adaptive-input-number-${name}`}
        />
      )
    case 'text':
      return (
        <TextField
          id={id}
          label={label}
          fullWidth
          variant='outlined'
          value={value[keyValue]}
          onChange={event => onChange(name, event.target.value)}
          data-testid={`adaptive-input-text-${name}`}
        />
      )
    default:
      return (
        <TextField
          id={id}
          label={label}
          fullWidth
          variant='outlined'
          value={value[keyValue]}
          onChange={event => onChange(name, event.target.value)}
          data-testid={`adaptive-input-default-${name}`}
        />
      )
  }
}

export default AdaptiveInput
