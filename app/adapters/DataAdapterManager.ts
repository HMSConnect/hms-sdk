import { adapterConfig } from '@config'
import AuthService from '@services/AuthService'
import { HMSService } from '@services/HMSServiceFactory'
import * as _ from 'lodash'
import AuthAdapter from './AuthAdapter'
import DevelopmentAdapter from './DevelopmentAdapter'
import DevelopmentRemoteAdapter from './DevelopmentRemoteAdapter'

class DataAdapterManager {
  createAdapter(mode: string) {
    const Adapter = _.get(adapterConfig, `${mode}.clazz`)
    if (Adapter) {
      const adapter = new Adapter(
        `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/smart-fhir`,
      )
      HMSService.setDefaultAdapter(adapter)
      AuthService.setDefaultAdapter(adapter)
    } else {
      const adapter = new DevelopmentRemoteAdapter(
        `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/smart-fhir`,
      )
      // const adapter = new DevelopmentAdapter(
      //   `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/smart-fhir`,
      // )
      HMSService.setDefaultAdapter(adapter)
      AuthService.setDefaultAdapter(adapter)
    }
    // const authAdapter = new AuthAdapter(
    //   `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}`,
    // )
  }
}

export const AdapterManager = new DataAdapterManager()
