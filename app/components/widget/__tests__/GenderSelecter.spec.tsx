import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import GenderSelector from '../GenderSelecter'

describe('PatientFilterBar', () => {
  it('render <PatientFilterBar />', () => {
    const value = 'male'
    const onGenderChange = jest.fn()
    const { findAllByText } = render(
      <GenderSelector value={value} onGenderChange={onGenderChange} />
    )
    expect(findAllByText('male')).toBeTruthy()
  })

  it('change value <PatientFilterBar />', () => {
    const value = 'male'
    const onGenderChange = jest.fn()
    const { findAllByText, getByTestId, getByText } = render(
      <GenderSelector value={value} onGenderChange={onGenderChange} />
    )

    const selectOption = getByText('Male')

    fireEvent.click(selectOption)
    fireEvent.click(getByText('Female'))


    expect(onGenderChange).toBeCalled()
    expect(onGenderChange.mock.calls[0][1]).toBe('female')
  })
})
