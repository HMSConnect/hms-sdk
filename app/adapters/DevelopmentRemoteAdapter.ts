import AuthService from '@services/AuthService'
import { AxiosResponse } from 'axios'
import { stringify } from 'qs'
import AbstractAdapter from './AbstractAdapter'
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
      .get(resource, headers, stringify(params))
      .then((response: any) => {
        if (response.error) {
          throw new Error(response.error)
        }

        return {
          ...response.data,
          totalCount: response.totalCount ? response.totalCount : undefined,
        }
      })
  }
}
