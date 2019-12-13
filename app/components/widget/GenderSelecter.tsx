import React from 'react'

import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SelectOption from '../base/SelectOption'

const useStyles = makeStyles((theme: Theme) => ({
  searchFilter: {
    width: '100%'
  }
}))

const GenderSelector: React.FunctionComponent<{
  value: string
  onGenderChange: (type: string, value: any) => void
}> = ({ value, onGenderChange }) => {
  const classes = useStyles()
  return (
    <SelectOption
      label='Gender'
      labelId='gender-select-label'
      id='gender-select'
      value={value}
      options={[
        { value: 'all', label: 'All' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]}
      onChange={(
        event: React.ChangeEvent<{ name?: string; value: unknown }>
      ) => {
        onGenderChange('gender', event.target.value)
      }}
      classOption={classes.searchFilter}
      data-testid='genter-select-option'
    ></SelectOption>
  )
}

export default GenderSelector
