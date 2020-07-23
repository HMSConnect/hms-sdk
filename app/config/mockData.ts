import environment from '@environment'
interface IMockData {
  patientId?: string
  encounterId?: string
}
const classicMock: IMockData = {
  encounterId: '',
  patientId: 'MOCK-54569-4443',
}
const sfhirMock: IMockData = {
  encounterId: '3898f0f9-385e-478d-be25-5f05719e80af',
  patientId: '0debf275-d585-4897-a8eb-25726def1ed5',
}
export const mockData: IMockData =
  environment.mode === 'classic' ? classicMock : sfhirMock
