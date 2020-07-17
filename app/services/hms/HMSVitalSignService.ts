import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import HMSVitalSignDataManager from '@data-managers/hms/HMSVitalSignDataManager'
import AbstractService from '@services/AbstractService'
import ValidatorManager from '@validators/ValidatorManager'
import * as _ from 'lodash'

const observationListCodeToList = [
  { code: '55284-4', value: 'Systolic BP,Diastolic BP' },
  { code: '8302-2', value: 'Height' },
  { code: '39156-5', value: 'MassIndex' },
  { code: '8310-5', value: 'Temperature' },
  { code: '29463-7', value: 'Weight' },
  { code: '8867-4', value: 'heart rate(age)' },
  { code: '72166-2', value: 'tabacoSmokingStatue' },
]

export default class HMSVitalSignService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new HMSVitalSignDataManager('vitalsign', adapter)
  }

  async list(params: any): Promise<any> {
    // console.info(`[service] loading resource list`, params)
    const newMapParam = this.mapParam(params)
    const splitName = _.split(_.get(newMapParam, 'filter.name'), ',')
    if (splitName.length > 0) {
      let result: any[] = []
      for (const name of splitName) {
        const newResult = await this.dataManager.list({
          ...newMapParam,
          filter: {
            ...newMapParam.filter,
            name,
          },
        })
        result = _.concat(result, this.validator(newResult).data)
      }
      return { data: result }
    } else {
      const result = await this.dataManager.list(newMapParam)
      return this.validator(result)
    }
  }

  private validator(result: any) {
    const validator = ValidatorManager.compile(result.schema)
    if (validator) {
      return {
        ...result,
        data: result.data.map((result: any) => validator.parse(result)),
      }
    } else {
      throw Error('not support this schema.')
    }
  }

  private mapParam(params: any) {
    const cloneParamrs = _.cloneDeep(params)
    const filter = cloneParamrs?.filter || {}
    if (filter.code) {
      filter.name = _.get(
        _.find(
          observationListCodeToList,
          (observation) => observation.code === filter.code,
        ),
        'value',
      )
      delete filter.code
    }
    if (filter.codes) {
      const codeList = _.split(filter.codes, ',')
      filter.name = _.chain(codeList)
        .map((code) => {
          const selectedCodeList = _.find(
            observationListCodeToList,
            (mapCode) => mapCode.code === code,
          )

          return selectedCodeList?.value
        })
        .join(',')
        .value()
      delete filter.codes
    }
    if (filter._lasted) {
      delete filter._lasted
    }
    return { ...params, filter }
  }
}
