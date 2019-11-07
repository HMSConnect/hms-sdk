import axios from 'axios'
import dataAdapter from "./DataAdapter"

class PatientDataAdaptor {
    async get(id: string) {                
        return axios(`${dataAdapter.host}/patient/${id}`)
    }
}
const patientDataAdaptor = new PatientDataAdaptor()
export default patientDataAdaptor