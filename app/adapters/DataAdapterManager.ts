import { adapterConfig } from '@config'
import AuthService from '@services/AuthService'
import { HMSService } from '@services/HMSServiceFactory'
import * as _ from 'lodash'
import DevelopmentRemoteAdapter from './DevelopmentRemoteAdapter'

class DataAdapterManager {
  createAdapter(mode: string) {
    const Adapter = _.get(adapterConfig, `${mode}.clazz`)
    let adapter
    if (Adapter) {
      adapter = new Adapter(
        `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/smart-fhir`,
      )
      HMSService.setDefaultAdapter(adapter)
      AuthService.setDefaultAdapter(adapter)
    } else {
      adapter = new DevelopmentRemoteAdapter('https://ehie.bdms.co.th:8443')
    }
    HMSService.setDefaultAdapter(adapter)
    AuthService.setDefaultAdapter(adapter)
  }
}

export const AdapterManager = new DataAdapterManager()
