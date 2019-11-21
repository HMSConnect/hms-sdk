import IAdapter from '../adapters/IAdapter'
import IService from './IService'

class HMSServiceFactory {
  registry: Map<string, any> = new Map()
  instances: Map<string, IService> = new Map()
  defaultAdatper: IAdapter | null = null
  register(name: string, clazz: any) {
    this.registry.set(name, clazz)
  }
  getService(resource: string, adapter?: IAdapter): IService | undefined {
    let instance = this.instances.get(resource)
    if (!instance) {
      const serviceCreator = this.registry.get(resource)
      if (serviceCreator) {
        instance = new serviceCreator(resource, adapter || this.defaultAdatper)
      }
    }
    return instance
  }

  setDefaultAdapter(adapter: IAdapter) {
    this.defaultAdatper = adapter
  }
}

export const HMSService = new HMSServiceFactory()
