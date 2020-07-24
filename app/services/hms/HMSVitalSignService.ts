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
  { code: '8867-4', value: 'Heart rate' },
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
    if (splitName.length > 1) {
      let data: any[] = []
      let resultWithoutData
      for (const name of splitName) {
        const newResult = await this.dataManager.list({
          ...newMapParam,
          filter: {
            ...newMapParam.filter,
            name,
          },
        })
        if (!resultWithoutData) {
          resultWithoutData = _.omit(newResult, 'data')
        }
        data = _.concat(data, newResult.data)
      }
      const resultWithAllData = {
        ...resultWithoutData,
        data,
      }
      const newResultWithComponentData = this.groupBpValue(resultWithAllData)
      return this.validator(newResultWithComponentData)
    } else {
      const result = await this.dataManager.list(newMapParam)
      const newResultWithComponentData = this.groupBpValue(result)
      return this.validator(newResultWithComponentData)
    }
  }

  private groupBpValue(result: any) {
    const dataWithGroupByHn = _.groupBy(result.data, 'en')
    const data = _.map(dataWithGroupByHn, (value, key) => {
      return _.reduce(
        value,
        (acc: any[], v, k) => {
          if (_.includes(v.name, 'BP(PED)')) {
            let selectedBpObject = _.find(
              acc,
              (acValue: any) => acValue.name === 'BP(PED)',
            )
            if (!selectedBpObject) {
              selectedBpObject = {
                ...v,
                component: [
                  // {
                  //   name: 'Systolic BP(PED)',
                  //   value: null,
                  // },
                  // {
                  //   name: 'Diastolic BP(PED)',
                  //   value: null,
                  // },
                ],
                name: 'BP(PED)',
              }
              acc.push(selectedBpObject)
            }
            const findComponentIndex = _.findIndex(
              selectedBpObject.component,
              (component: any) => _.includes(component.name, v.name),
            )
            if (findComponentIndex >= 0) {
              selectedBpObject.component[findComponentIndex] = v
            } else {
              selectedBpObject.component.push(v)
            }
          } else if (_.includes(v.name, 'BP')) {
            let selectedBpObject = _.find(
              acc,
              (acValue: any) => acValue.name === 'BP',
            )
            if (!selectedBpObject) {
              selectedBpObject = {
                ...v,
                component: [
                  // {
                  //   name: 'Systolic BP',
                  //   value: null,
                  // },
                  // {
                  //   name: 'Diastolic BP',
                  //   value: null,
                  // },
                ],
                name: 'BP',
              }
              acc.push(selectedBpObject)
            }
            const findComponentIndex = _.findIndex(
              selectedBpObject.component,
              (component: any) => _.includes(component.name, v.name),
            )
            if (findComponentIndex >= 0) {
              selectedBpObject.component[findComponentIndex] = v
            } else {
              selectedBpObject.component.push(v)
            }
          } else {
            acc.push(v)
          }
          return acc
        },
        [],
      )
    })
    return {
      ...result,
      data: _.flatten(data),
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
