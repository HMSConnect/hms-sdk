import * as _ from 'lodash'

import { AdapterConfig } from '../config'
import { HMSService } from '../services/HMSServiceFactory'
import DevelopmentAdapter from './DevelopmentAdapter'

class DataAdapterManager {
  createAdapter(mode: string) {
    // let adapter
    const Adapter = _.get(AdapterConfig, mode)
    if (Adapter) {
      const adapter = new Adapter.clazz(
        `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/smart-fhir`
      )
      HMSService.setDefaultAdapter(adapter)
    } else {
      const adapter = new DevelopmentAdapter(
        `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/smart-fhir`
      )
      HMSService.setDefaultAdapter(adapter)
    }
  }
}

export const AdapterManager = new DataAdapterManager()
