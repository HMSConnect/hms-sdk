import environment from '@environment'
import AuthService, { IAuthLoginCallback } from '@services/AuthService'
import { AxiosResponse } from 'axios'
import { stringify } from 'qs'
import AbstractAdapter from './AbstractAdapter'
const hmshealthapi = require('@hmsconnect/hmshealthapi')

interface IDevelopmentRemoteAuth {
  username: string
  password: string
}

export default class DevelopmentRemoteAdapter extends AbstractAdapter {
  hms: any
  constructor(host: string) {
    super(host, 'dev_remote')
    this.hms = hmshealthapi()
    this.hms.SetConfig({
      endpoints: {
        // get_domain_resource: '/sandbox/sfhir/stu3',
        get_domain_resource: '/sandbox/api/v2',
        get_version: '/sandbox/version',
      },
      host: this.host,
    })
  }

  async login(authData: IDevelopmentRemoteAuth, callback: IAuthLoginCallback) {
    this.hms.Initial(
      {
        ...authData,
        client_id: environment.auth.client_id,
      },
      callback,
    )
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
    return this.hms
      .get(resource, headers, stringify(params))
      .then((response: any) => {
        return {
          schema: { version: 1.0, standard: 'SFHIR', resourceType: resource },
          ...response,
        }
      })
  }
}
