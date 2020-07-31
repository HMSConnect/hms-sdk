import * as React from 'react'

import ModalContentTest from '@components/base/__mocks__/ModalContentTest'
import { BootstraperHelperMock } from '@init/__mocks__/BootstraperHelperMock'
import BootstrapHelper from '@init/BootstrapHelper'
import { render } from '@testing-library/react'
import BootstrapWrapper from '../BootstrapWrapper'

jest.mock('@init/BootstrapHelper', () => ({
  __esModule: true,
  default: BootstraperHelperMock,
}))

jest.mock('@config/widget_dependencies.json', () => ({
  __esModule: true,
  default: {
    patient: {
      services: ['patient'],
      validators: ['Vpatient'],
    },
  },
}))
jest.mock('@config/widget_classic_dependencies.json', () => ({
  __esModule: true,
  default: {
    hms_pi: {
      services: ['hms_pi'],
      validators: ['Vpatient'],
    },
  },
}))

describe('<BootstrapWrapper />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('render BootstrapWrapper', () => {
    render(
      <BootstrapWrapper dependencies={['patient']}>
        <ModalContentTest />
      </BootstrapWrapper>,
    )
    const registerServicesFn = BootstrapHelper.registerServices as jest.Mock
    const registerValidatorsFn = BootstrapHelper.registerValidators as jest.Mock
    expect(registerServicesFn).toBeCalled()
    expect(registerValidatorsFn).toBeCalled()
    expect(registerServicesFn.mock.calls[0][0]).toStrictEqual(['patient'])
    expect(registerValidatorsFn.mock.calls[0][0]).toStrictEqual(['Vpatient'])
  })

  it('get empty BootstrapWrapper', () => {
    render(
      <BootstrapWrapper dependencies={['encounter']}>
        <ModalContentTest />
      </BootstrapWrapper>,
    )
    const registerServicesFn = BootstrapHelper.registerServices as jest.Mock
    const registerValidatorsFn = BootstrapHelper.registerValidators as jest.Mock

    expect(registerServicesFn.mock.calls[0][0]).toStrictEqual([])
    expect(registerValidatorsFn.mock.calls[0][0]).toStrictEqual([])
  })

  it('should be sfhir mode', () => {
    render(
      <BootstrapWrapper dependencies={['patient']} mode={'sfhir'}>
        <ModalContentTest />
      </BootstrapWrapper>,
    )
    const registerServicesFn = BootstrapHelper.registerServices as jest.Mock
    expect(registerServicesFn).toBeCalled()
    expect(registerServicesFn.mock.calls[0][0]).toStrictEqual(['patient'])
  })
  it('should be classic mode', () => {
    render(
      <BootstrapWrapper dependencies={['hms_pi']} mode={'classic'}>
        <ModalContentTest />
      </BootstrapWrapper>,
    )
    const registerServicesFn = BootstrapHelper.registerServices as jest.Mock
    expect(registerServicesFn).toBeCalled()
    expect(registerServicesFn.mock.calls[0][0]).toStrictEqual(['hms_pi'])
  })
})
