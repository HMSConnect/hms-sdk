import Axios, { AxiosResponse } from 'axios'
import * as _ from 'lodash'
import { stringify } from 'qs'
import AbstractAdapter from './AbstractAdapter'
import AuthService from '@services/AuthService'
const hmshealthapi = require('@hmsconnect/hmshealthapi')

let tokens = {
  username: '[YOUR_USER_NAME]',
  password: '[YOUR_PASSWORD]',
  client_id: '[YOUR_CLIENT_ID]',
}
export default class DevelopmentRemoteAdapter extends AbstractAdapter {
  constructor(host: string) {
    super(host, 'dev_remote')
  }

  async setConfig(hms: any) {
    hms.SetConfig({
      endpoints: {
        get_domain_resource: '/sandbox/sfhir/stu3',
        get_version: '/sandbox/version',
      },
      host: 'https://ehie.bdms.co.th:8443',
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
        return {
          schema: { version: 1.0, standard: 'SFHIR', resourceType: resource },
          ...response,
        }
      })
    // const result = await Axios.get(`${this.host}/${resource}`, {
    //   params,
    //   paramsSerializer: (params) => stringify(params),
    // })
    // return result.data
  }
}
