import IAdapter from '@adapters/IAdapter'
import DataManager from '@data-managers/DataManager'
import EncounterDataManager from '@data-managers/EncounterDataManager'
import ValidatorManager from '@validators/ValidatorManager'
import * as _ from 'lodash'
import AbstractService from './AbstractService'
import { HMSService } from './HMSServiceFactory'

class EncounterService extends AbstractService {
  createDataManager(resource: string, adapter: IAdapter): DataManager {
    return new EncounterDataManager(resource, adapter)
  }

  async list(params: any): Promise<any> {
    const encounterEntryParams = _.cloneDeep(params)
    const result = await this.dataManager.list(params)
    const validator = ValidatorManager.compile(result.schema)
    if (validator) {
      const res = { ...result }
      const data = []
      for (const item of result.data) {
        const encounterRelate = validator.parse(item)
        await this.mappingEnounterRelate(encounterRelate, encounterEntryParams)
        data.push(encounterRelate)
      }
      res.data = data
      return res
    } else {
      throw Error('not support this schema.')
    }
  }
  async load(id: string, options?: any): Promise<any> {
    const encounterEntryOptions = _.cloneDeep(options)
    const result = await this.dataManager.load(id, options)
    const validator = ValidatorManager.compile(result.schema)
    if (validator) {
      const res = result
      const encounterRelate = validator.parse(result.data)
      await this.mappingEnounterRelate(encounterRelate, encounterEntryOptions)
      res.data = encounterRelate
      return res
    } else {
      throw Error('not support this schema.')
    }
  }
  async typeList(params?: any): Promise<any> {
    const dataManager = this.dataManager as EncounterDataManager
    const result = await dataManager.typeList(params || {})
    return {
      ...result,
      data: result.data,
    }
  }

  async resourceList(id: string): Promise<any> {
    const dataManager = this.dataManager as EncounterDataManager
    const result = await dataManager.resourceList(id)
    return {
      ...result,
      data: result.data,
    }
  }
  private async mappingEnounterRelate(data: any, params: any) {
    const employeeId = _.get(_.last(data.participant), 'employeeId')
    if (params.withPractitioner) {
      const practitionerService = HMSService.getService(
        'practitioner',
      ) as AbstractService
      const participant = await practitionerService.list({
        employeeId,
      })
      const displayParticipants: any = []
      _.map(participant.data, (participantItem) => {
        displayParticipants.push({
          name: [{ given: [participantItem.displayName] }],
        })
      })

      data.participant = participant.data
    }
    if (params.withDiagnosis) {
      const diagnosisService = HMSService.getService(
        'diagnostic_report',
      ) as AbstractService
      const diagnosis = await diagnosisService.list({
        en: data.id,
      })
      data.diagnosis = diagnosis.data
    }
    return data
  }
}

export default EncounterService
