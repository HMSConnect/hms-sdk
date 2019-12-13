import { IListDefaultQuery } from '../utils/types'
import DataManager from './DataManager'

export interface IDiagnosticReportLastQuery extends IListDefaultQuery {
  filter?: IDiagnosticReportFilterQuery
  _lasted?: boolean
  withObservation?: boolean
}

export interface IDiagnosticReportFilterQuery {
  patientId?: string
  encounterId?: string
}

class DiagnosticReportDataManager extends DataManager {
  // customize operation if needed
  last(query: IDiagnosticReportLastQuery | {}): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}`, {
      ...query,
      _lasted: true
    })
  }
}

export default DiagnosticReportDataManager
