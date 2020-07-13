import AuthService from '@services/AuthService'
import { AxiosResponse } from 'axios'
import { stringify } from 'qs'
import AbstractAdapter from './AbstractAdapter'
import _ from 'lodash'
export default class DevelopmentRemoteAdapter extends AbstractAdapter {
  constructor(host: string) {
    super(host, 'dev_remote')
  }

  async setConfig(hms: any) {
    hms.SetConfig({
      endpoints: {
        get_domain_resource: '/sandbox/api/v2',
        get_version: '/sandbox/version',
      },
      host: this.host,
    })
  }

  async doRequest(resource: string, params: any): Promise<AxiosResponse<any>> {
    // console.info(`requesting for ${resource} with params = `, params)
    const authData = AuthService.getAuthData()
    if (!authData.isAuthenticated) {
      return Promise.reject(new Error('not auth'))
    }
    const headers = {
      Authorization: `Bearer ${authData.token}`,
    }
    const hms = AuthService.getHms()
    return hms
      .get(resource, headers, this.toJson(params))
      .then((response: any) => {
        if (response.error) {
          throw new Error(response.error)
        }
        return {
          ...this.fromJson(response.data),
          totalCount: response.totalCount ? response.totalCount : undefined,
        }
      })
  }

  private toJson(params: any) {
    const filter = params?.filter || {}
    this.renameEntry(filter, 'patientId', 'hn')
    this.renameEntry(filter, 'encounterId', 'en')
    this.renameEntry(params, 'max', '_count')
    if (params.filter) {
      delete params['filter']
    }
    delete filter['code']
    return stringify({ ...params, ...filter })
  }
  private fromJson(data: any) {
    const response = data
    this.renameEntry(response, 'hn', 'patientId')
    return response
  }
  private renameEntry(object: any = {}, oldKey: string, newKey: string) {
    if (object[oldKey]) {
      object[newKey] = object[oldKey]
      delete object[oldKey]
    }
  }
}
