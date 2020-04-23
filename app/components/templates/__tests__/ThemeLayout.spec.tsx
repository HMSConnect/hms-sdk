import * as React from 'react'

import themeApp from '@app/reducers-redux/theme.reducer'
import { renderWithRedux } from '@app/reducers-redux/__mocks__/renderWithRedux'
import ComponentMock from '@components/base/__mocks__/ComponentMock'
import { createStore } from 'redux'
import ThemeLayout from '../ThemeLayout'

describe('<ThemeLayout />', () => {
  it('render <ThemeLayout>', () => {
    const { queryByText } = renderWithRedux(
      <ThemeLayout defaultTheme={'normal'}>
        <ComponentMock title={'Theme Test'} />
      </ThemeLayout>,
      {
        initialState: {},
        store: createStore(themeApp, {
          themeApp: {
            isCustom: false,
            themeName: 'normal',
            themeObject: {},
          },
        }),
      },
    )

    expect(queryByText('Theme Test')).toBeTruthy()
  })
})
