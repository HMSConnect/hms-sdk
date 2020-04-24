import Axios, { AxiosResponse } from 'axios'
import * as _ from 'lodash'
import { stringify } from 'qs'
import AbstractAdapter from './AbstractAdapter'
const hmshealthapi = require('@hmsconnect/hmshealthapi')

let tokens = {
  username: '[YOUR_USER_NAME]',
  password: '[YOUR_PASSWORD]',
  client_id: '[YOUR_CLIENT_ID]'
}
const hms = hmshealthapi()

export default class DevelopmentRemoteAdapter extends AbstractAdapter {
  accessToken: any
  constructor(host: string) {
    super(host, 'dev_remote')
    hms.Initial(tokens, (error: any, response: any) => {
      if (error) {
        throw new Error(error)
      }
      hms.SetConfig({
        endpoints: {
          get_domain_resource: '/sandbox/sfhir/stu3',
          get_version: '/sandbox/version',
        },
        host: 'https://ehie.bdms.co.th:8443',
      })

      this.accessToken = response.access_token
    })
  }

  async doRequest(resource: string, params: any): Promise<AxiosResponse<any>> {
    // console.info(`requesting for ${resource} with params = `, params)
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    }

    return hms
      .get(resource, headers, stringify(params))
      .then((response: any) => {
        return {
          schema: { version: 1.0, standard: 'SFHIR', resourceType: response },
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
