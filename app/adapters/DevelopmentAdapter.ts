import { IAuthLoginCallback } from '@services/AuthService'
import Axios, { AxiosResponse } from 'axios'
import { stringify } from 'qs'
import AbstractAdapter from './AbstractAdapter'

interface IDevelopmentAuth {
  username: string
  password: string
}

export default class DevelopmentAdapter extends AbstractAdapter {
  constructor(host: string) {
    super(host, 'dev')
  }

  async login(authData: IDevelopmentAuth, callback: IAuthLoginCallback) {
    callback(null, { access_token: 'test1234', refresh_token: '' })
  }

  async doRequest(resource: string, params: any): Promise<AxiosResponse<any>> {
    // console.info(`requesting for ${resource} with params = `, params)
    const result = await Axios.get(`${this.host}/${resource}`, {
      params,
      paramsSerializer: (params) => stringify(params),
    })
    return result.data
  }
}
