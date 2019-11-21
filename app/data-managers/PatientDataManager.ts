import DataManager from './DataManager'

class PatientDataManager extends DataManager {
  // customize operation if needed
  resourceList(query: any): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}/resource-list`, query)
  }
}

export default PatientDataManager
