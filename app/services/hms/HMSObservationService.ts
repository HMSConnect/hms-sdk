import IAdapter from '@adapters/IAdapter'
import widgetClassicDependencies from '@config/widget_classic_dependencies.json'
import DataManager from '@data-managers/DataManager'
import ObservationDataManager from '@data-managers/ObservationDataManager'
import BootstrapHelper from '@init/BootstrapHelper'
import { HMSService } from '@services/HMSServiceFactory'
import ObservationService from '@services/ObservationService'
import * as _ from 'lodash'
import HMSLaboratoryService from './HMSLaboratoryService'
import HMSVitalSignService from './HMSVitalSignService'

export default class HMSObservationService extends ObservationService {
  constructor(resource: string, adapter: IAdapter) {
    super(resource, adapter)
    for (const dependencyName of ['vital_sign', 'laboratory']) {
      const dependency = _.get(widgetClassicDependencies, dependencyName) || {}
      BootstrapHelper.registerServices(
        dependency.services || [],
        dependencyName,
      )
      BootstrapHelper.registerValidators(dependency.validators || [])
    }
  }

  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new ObservationDataManager('observation', adapter)
  }

  async list(params: any): Promise<any> {
    // console.info(`[service] loading resource list`, params)
    const vitalSignService = HMSService.getService(
      'vital_sign',
    ) as HMSVitalSignService
    const labService = HMSService.getService(
      'laboratory',
    ) as HMSLaboratoryService
    const mapParam = this.mapParam(params)
    const categoryCode = _.get(params, 'filter.categoryCode')
    let results = []
    if (categoryCode === 'laboratory') {
      const labResult = await labService.list({})
      results = labResult.data
    } else if (categoryCode === 'vital-sign') {
      const vitalSignResult = await vitalSignService.list(mapParam)
      results = vitalSignResult.data
    } else {
      const vitalSignResult = await vitalSignService.list(mapParam)
      const labResult = await labService.list(mapParam)
      results = _.concat(labResult.data, vitalSignResult.data)
    }

    return {
      data: results,
      total: results.length,
    }
  }

  private mapParam(params: any) {
    return params
  }
}
