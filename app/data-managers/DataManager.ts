import IAdapter from '@adapters/IAdapter'
import { snakeCase } from 'lodash'
export default class DataManager {
  constructor(protected resource: string, protected adaptor: IAdapter) {
    this.resource = resource
    this.adaptor = adaptor
  }
  load(id: string, options?: any): Promise<any> {
    return this.adaptor.doRequest(`${snakeCase(this.resource)}/${id}`, {
      ...options,
    })
  }

  list(query: any): Promise<any> {
    return this.adaptor.doRequest(snakeCase(this.resource), query)
  }
}
