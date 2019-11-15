import axios from 'axios'
import { stringify } from 'qs'
import { PaginationOption } from '../components/hooks/usePatientList'
import dataAdapter from './DataAdapter'
class PatientDataAdaptor {
  public async get(id: string): Promise<any> {
    return axios(`${dataAdapter.host}/patient/${id}`)
  }
  public async list(options: PaginationOption): Promise<any> {
    return axios(`${dataAdapter.host}/patient/`, {
      params: options,
      paramsSerializer: params => stringify(params)
    })
  }
}
// const patientDataAdaptor = new PatientDataAdaptor()
// export default patientDataAdaptor
export default PatientDataAdaptor