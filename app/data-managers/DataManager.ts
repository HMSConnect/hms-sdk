import IAdapter from '../adapters/IAdapter'

export default class DataManager {
  constructor(protected resource: string, protected adaptor: IAdapter) {
    this.resource = resource
    this.adaptor = adaptor
  }
  load(id: string): Promise<any> {
    return this.adaptor.doRequest(`${this.resource}/${id}`, {})
  }

  list(query: any): Promise<any> {
    return this.adaptor.doRequest(this.resource, query)
  }
}
