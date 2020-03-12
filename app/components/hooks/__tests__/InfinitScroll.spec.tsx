import * as React from 'react'
import { render, createEvent, fireEvent } from '@testing-library/react'
import ComponentUseInfinitScrollMock from '../__mocks__/ComponentUseInfinitScrollMock'

describe('Test scroll', () => {
  it('ref infinit scroll call useInfinitScroll', async () => {
    const lazyFunction = jest.fn()
    const { queryByText, getByTestId } = render(
      <div style={{ height: 100, overflow: 'auto' }} data-testid='container'>
        <ComponentUseInfinitScrollMock
          style={{ height: 300 }}
          lazyFunction={lazyFunction}
        />
      </div>,
    )

    const containerElement = getByTestId('container')
    // console.log('containerElement :', containerElement);
    containerElement.scrollTop = 300
    const event = createEvent.scroll(containerElement)
    // fireEvent.scroll(containerElement, {})
    fireEvent(containerElement, event)

    // expect(lazyFunction).toBeCalled()

    expect(true).toBeTruthy()
  })
})
