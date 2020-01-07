import * as React from 'react'

import useEncounter from '@components/hooks/useEncounter'
import { render } from '@testing-library/react'
import EncounterInfoDetail from '../encounter/EncounterInfoDetail'

jest.mock('@components/hooks/useEncounter', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('<EncounterInfoDetail />', () => {
  let mockQuery: any
  beforeAll(() => {
    mockQuery = {
      encounterId: '001',
    }
  })
  it('render EncounterInfoDetail', () => {
    const useEncounterResult: any = useEncounter as any
    const results: any = {
      data: {
        type: 'Ty001',
      },
      error: null,
      isLoading: false,
    }
    useEncounterResult.mockImplementation(() => results)

    const { queryByText } = render(<EncounterInfoDetail query={mockQuery} />)
    expect(queryByText('Ty001')).toBeTruthy()
  })

  it('loading EncounterInfoDetail', () => {
    const useEncounterResult: any = useEncounter as any
    const results: any = {
      data: {
        type: 'Ty001',
      },
      error: null,
      isLoading: true,
    }
    useEncounterResult.mockImplementation(() => results)

    const { queryByText } = render(<EncounterInfoDetail query={mockQuery} />)
    expect(queryByText('Ty001')).toBeFalsy()
    expect(queryByText('encounter loading')).toBeTruthy()
  })
})
