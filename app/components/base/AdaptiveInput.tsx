import * as React from 'react'

import { FormControlLabel, Switch, TextField } from '@material-ui/core'

type AdaptiveInputType = 'text' | 'number' | 'choice' | 'boolean' | 'date'

export interface IAdaptiveInput {
  type: AdaptiveInputType
  name: string
  label: string
}

const AdaptiveInput: React.FunctionComponent<{
  name: string
  type: AdaptiveInputType
  label: string
  value: any
  id: string
  onChange: (type: string, value: any) => void
}> = ({ name, type, label, value = {}, id, onChange }) => {
  switch (type) {
    case 'date':
      return null
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
    case 'boolean':
      return (
        <FormControlLabel
          control={
            <Switch
              checked={value[name]}
              onChange={event => onChange(name, event.target.checked)}
              color='primary'
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
          value={value[name]}
          onChange={event => onChange(name, event.target.value)}
          type='number'
        />
      )
    case 'text':
      return (
        <TextField
          id={id}
          label={label}
          fullWidth
          variant='outlined'
          value={value[name]}
          onChange={event => onChange(name, event.target.value)}
        />
      )
    default:
      return (
        <TextField
          id={id}
          label={label}
          fullWidth
          variant='outlined'
          value={value[name]}
          onChange={event => onChange(name, event.target.value)}
        />
      )
  }
}

export default AdaptiveInput
