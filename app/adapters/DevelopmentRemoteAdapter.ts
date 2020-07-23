import environment from '@environment'
import AuthService, { IAuthLoginCallback } from '@services/AuthService'
import { AxiosResponse } from 'axios'
import _ from 'lodash'
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
    console.info(`requesting for ${resource} with params = `, params)
    const authData = AuthService.getAuthData()
    if (!authData.isAuthenticated) {
      return Promise.reject(new Error('not auth'))
    }
    const headers = {
      Authorization: `Bearer ${authData.token}`,
    }
    return this.hms
      .get(resource, headers, this.toJson(params))
      .then((response: any) => {
        if (response.error) {
          throw new Error(response.error)
        }
        return {
          ...this.fromJson(response.data),
          totalCount: response.data.total ? response.data.total : 0,
        }
      })
  }

  private toJson(params: any) {
    const newParams = _.cloneDeep(params)
    const filter = newParams?.filter || {}
    this.filterFieldConverter(filter)
    this.renameField(filter, 'patientId', 'hn')
    this.renameField(filter, 'encounterId', 'en')
    this.renameField(filter, 'assertedDate', 'onsetDatetime') // allergy

    this.renameField(newParams, 'max', '_count')
    this.renameField(newParams, 'page', '_page')
    this.removeMultiField(newParams, [
      'filter',
      'offset',
      'withDiagnosis',
      'withOrganization',
      'withPractitioner',
      '_lasted',
    ])
    delete filter['status']
    this.sortFieldCoverter(newParams)
    const result = { ...newParams, ...filter }
    this.removeAllIfNotExist(result, {
      exceptFields: ['onsetDatetime'],
    })

    return stringify(result)
  }
  private fromJson(data: any) {
    const response = data
    this.renameField(response, 'hn', 'patientId')
    return response
  }

  private renameField(field: any = {}, oldKey: string, newKey: string) {
    if (this.isExistField(field, oldKey)) {
      field[newKey] = field[oldKey]
      delete field[oldKey]
    }
  }

  private removeField(field: any = {}, fieldKey: string) {
    delete field[fieldKey]
  }

  private removeMultiField(field: any = {}, fieldKeys: string[]) {
    for (const fieldKey of fieldKeys) {
      this.removeField(field, fieldKey)
    }
  }

  private filterFieldConverter(filter: any = {}) {
    for (const [fieldKey, value] of Object.entries(filter)) {
      const [fieldName, filterField] = _.split(fieldKey, '_')
      if (filterField) {
        filter[fieldName] = value ? filterField + value : value
        this.removeField(filter, fieldKey)
      }
    }
  }

  private sortFieldCoverter(field: any = {}) {
    if (
      this.isExistField(field, 'sort') &&
      this.isExistField(field?.sort, 'orderBy')
    ) {
      const pipe = field.sort?.order === 'desc' ? '-' : ''
      field._sort = `${pipe}${field?.sort?.orderBy}`
      this.removeField(field, 'sort')
    }
  }

  private isExistField(field: any = {}, fieldKey: string) {
    return !(
      field[fieldKey] === null ||
      field[fieldKey] === undefined ||
      field[fieldKey] === ''
    )
  }

  private removeAllIfNotExist(field: any = {}, option: any) {
    for (const [fieldKey, value] of Object.entries(field)) {
      if (
        !this.isExistField(field, fieldKey) &&
        !_.includes(option.exceptFields || [], fieldKey)
      ) {
        this.removeField(field, fieldKey)
      }

      // specific case
      if (fieldKey === 'gender' && value === 'all') {
        this.removeField(field, fieldKey)
      }
    }
  }
}
