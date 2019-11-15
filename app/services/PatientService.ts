import * as _ from 'lodash'
import PatientDataAdaptor from '../adapters/PatientDataAdapter'
import {
  PaginationOption,
  PatientResultList
} from '../components/hooks/usePatientList'
import Patient from '../models/Patient'

class PatientService {
  private patientDataAdapter: PatientDataAdaptor

  constructor(patientDataAdapter: PatientDataAdaptor) {
    this.patientDataAdapter = patientDataAdapter
  }

  public async get(id: string): Promise<Patient> {
    const json = await this.patientDataAdapter.get(id)
    const schema = _.get(json, 'data.schema')
    return Patient.parse({
      patient: json.data.data,
      schema
    })
  }

  public async list(options: PaginationOption): Promise<PatientResultList> {
    const json = await this.patientDataAdapter.list(options)
    const schema = _.get(json, 'data.data.schema')
    const results = _.map(json.data.data.results, patient =>
      Patient.parse({
        patient,
        schema
      })
    )
    return {
      results,
      totalCount: json.data.data.totalCount
    }
  }
}
export default PatientService
