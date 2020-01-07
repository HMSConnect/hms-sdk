import * as React from 'react'

import usePatient from '@components/hooks/usePatient'
import useResourceList from '@components/hooks/useResourceList'
import { fireEvent, render } from '@testing-library/react'
import PatientInfoDetail from '../patient/PatientInfoDetail'
import useEncounter from '@components/hooks/useEncounter'

jest.mock('@components/hooks/usePatient', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/useResourceList', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('@components/hooks/useEncounter', () => ({
  __esModule: true,
  default: jest.fn(),
}))
describe('<PatientInfoDetail />', () => {
  let mockQuery: any
  beforeAll(async () => {
    mockQuery = {
      patientId: '0001',
    }
    const usePatientResult: any = usePatient as any
    usePatientResult.mockImplementation(() => ({
      data: {
        gender: 'male',
        name: {
          family: ['FTest1'],
          given: ['Test1'],
          prefix: ['Mr.'],
        },
      },
      error: null,
      isLoading: false,
    }))
    const useEncounterResult: any = useEncounter as any
    useEncounterResult.mockImplementation(() => ({
      data: {
        type: 'Encounter Type1',
      },
      error: null,
      isLoading: false,
    }))

    const useResourceListResult: any = useResourceList as any
    // const encounterListData = await EncounterServiceMock.list(null)
    useResourceListResult.mockImplementation(() => ({
      data: [
        { resourceType: 'patient', totalCount: 1, data: [] },
        { resourceType: 'diagnostic', totalCount: 1, data: [] },
        {
          data: [
            {
              reason: 'Test1',
              serviceProvider: {
                name: `ServiceTest1`,
              },
              type: 'ADMS',
            },
            {
              reason: 'Test1',
              serviceProvider: {
                name: `ServiceTest2`,
              },
              type: 'EECM',
            },
          ],
          resourceType: 'encounter',
          totalCount: 2,
        },
      ],
      error: null,
      isLoading: false,
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render PatientInfoDetail', () => {
    const { queryAllByText, getByText } = render(
      <PatientInfoDetail query={mockQuery} />,
    )
    expect(queryAllByText('Mr. Test1 FTest1')[0]).toBeTruthy()
  })

  it('render With encounterId PatientInfoDetail', () => {
    const newQuery = {
      ...mockQuery,
      encounterId: '0001',
    }
    const { queryAllByText, getByText } = render(
      <PatientInfoDetail query={newQuery} />,
    )
    expect(queryAllByText('Encounter Type1')[0]).toBeTruthy()
  })

  it('render Navigate PatientInfoDetail', () => {
    const { queryAllByText, getByText, queryByText } = render(
      <PatientInfoDetail query={mockQuery} />,
    )
    expect(queryAllByText('Mr. Test1 FTest1')[0]).toBeTruthy()

    const encounterMenuElement = getByText('Encounter')
    fireEvent.click(encounterMenuElement)
    expect(queryByText('ServiceTest2')).toBeTruthy()

    const dianosticMenuElement = getByText('Diagnostic')
    fireEvent.click(dianosticMenuElement)
    expect(queryByText('Comming soon')).toBeTruthy()
  })

  it('loading PatientInfoDetail', () => {
    const usePatientResult: any = usePatient as any
    usePatientResult.mockImplementation(() => ({
      data: null,
      error: null,
      isLoading: true,
    }))
    const { queryAllByText, getByText } = render(
      <PatientInfoDetail query={mockQuery} />,
    )
    expect(queryAllByText('Mr. Test1 FTest1')[0]).toBeFalsy()
  })

  it('error PatientInfoDetail', () => {
    const errorMessage = 'Test Error'
    const usePatientResult: any = usePatient as any
    usePatientResult.mockImplementation(() => ({
      data: null,
      error: errorMessage,
      isLoading: true,
    }))
    const { queryAllByText, getByText } = render(
      <PatientInfoDetail query={mockQuery} />,
    )
    expect(queryAllByText(`Error: ${errorMessage}`)).toBeTruthy()
  })
})
