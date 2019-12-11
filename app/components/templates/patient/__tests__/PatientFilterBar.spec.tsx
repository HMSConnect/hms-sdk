import React from 'react'
import PatientFilterBar, { IPatientFilterValue } from '../PatientFilterBar'
import { render } from '@testing-library/react'

describe('PatientFilterBar', () => {
  it('render <PatientFilterBar />', () => {
    const filter: IPatientFilterValue = {
      gender: 'male',
      searchText: ''
    }
    const onFilterChange = jest.fn()
    const { findAllByText } = render(
      <PatientFilterBar filter={filter} onFilterChange={onFilterChange} />
    )
    expect(findAllByText('male')).toBeTruthy()
  })
})
