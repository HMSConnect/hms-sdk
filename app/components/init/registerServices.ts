import DiagnosticReportService from '../../services/DiagnosticReportService'
import EncounterService from '../../services/EncounterService'
import { HMSService } from '../../services/HMSServiceFactory'
import PatientService from '../../services/PatientService'

function registerServices(services: string[]) {
  services.forEach(serviceName => {
    if (!HMSService.isExist(serviceName)) {
      switch (serviceName) {
        case 'patient':
          HMSService.register('patient', PatientService)
          break
        case 'encounter':
          HMSService.register('encounter', EncounterService)
          break
        case 'diagnostic_report':
          HMSService.register('diagnostic_report', DiagnosticReportService)
          break
        default:
          break
      }
    }
  })
}

export default registerServices
