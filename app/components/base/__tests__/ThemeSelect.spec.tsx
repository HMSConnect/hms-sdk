import * as React from 'react'

import {
  themeInitialState,
  themeReducer,
} from '@app/reducers-redux/theme.reducer'
import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import userEvent from '@testing-library/user-event'
import * as useRedux from 'react-redux'
import { createStore } from 'redux'
import ThemeSelect from '../ThemeSelect'

describe('<ThemeSelect />', () => {
  it('render <ThemeSelect />', () => {
    const dispatch = jest.spyOn(useRedux, 'useDispatch') as any
    const dispatchFn = jest.fn()
    dispatch.mockImplementation((params: any) => dispatchFn)
    const { queryByText } = renderWithRedux(<ThemeSelect />, {
      initialState: {},
      store: createStore(themeReducer, {
        themeReducer: themeInitialState,
      }),
    })

    expect(queryByText('Normal')).toBeTruthy()
  })

  it('select dark theme <ThemeSelect />', () => {
    const dispatch = jest.spyOn(useRedux, 'useDispatch') as any
    const dispatchFn = jest.fn()
    dispatch.mockImplementation((params: any) => dispatchFn)
    const { queryByText, getByText } = renderWithRedux(<ThemeSelect />, {
      initialState: {},
      store: createStore(themeReducer, {
        themeReducer: themeInitialState,
      }),
    })

    expect(queryByText('Normal')).toBeTruthy()
    const selectElement = getByText('Normal')
    userEvent.click(selectElement)
    const darkElement = getByText('Dark')
    userEvent.click(darkElement)

    expect(dispatchFn).toHaveBeenCalled()
  })
})
