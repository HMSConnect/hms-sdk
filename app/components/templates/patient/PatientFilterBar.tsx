import React from 'react'

import { Grid, makeStyles, Theme } from '@material-ui/core'
import SelectOption from '../../base/SelectOption'
import GenderSelector from '../../widget/GenderSelecter'

export interface IAgeValue {
  to: number | null
  form: number | null
  isAlive: boolean | null
}
export interface IPatientFilterValue {
  searchText: string
  gender: 'male' | 'female' | 'all'
  age?: any
}

const PatientFilterBar: React.FunctionComponent<{
  filter: IPatientFilterValue
  onFilterChange: (type: string, value: any) => void
}> = ({ filter, onFilterChange }) => {
  return (
    <>
      <Grid item xs={3}>
        <GenderSelector
          value={filter.gender}
          onGenderChange={onFilterChange}
        />
      </Grid>
    </>
  )
}

export default PatientFilterBar
