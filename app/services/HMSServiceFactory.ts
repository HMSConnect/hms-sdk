import IAdapter from '@adapters/IAdapter'
import { DependencyType } from '@components/init/BootstrapWrapper'
import * as _ from 'lodash'
import IService from './IService'
class HMSServiceFactory {
  registry: Map<string, any> = new Map()
  resourceMapping: Map<string, string> = new Map()
  instances: Map<string, IService> = new Map()
  defaultAdatper: IAdapter | null = null
  register(name: string, clazz: any, resource?: string) {
    resource = resource || _.kebabCase(name)
    console.info('registering service..', name, resource)
    this.registry.set(name, clazz)
    this.resourceMapping.set(name, resource)
  }
  isExist(name: string) {
    return !_.isUndefined(this.registry.get(name))
  }
  getService(name: string, adapter?: IAdapter): IService | undefined {
  // getService(name: DependencyType, adapter?: IAdapter): IService | undefined {
    let instance = this.instances.get(name)
    if (!instance) {
      const serviceCreator = this.registry.get(name)
      if (serviceCreator) {
        instance = new serviceCreator(
          this.resourceMapping.get(name),
          adapter || this.defaultAdatper,
        ) as IService
        this.instances.set(name, instance)
      } else {
        throw new Error(`service ${name} not register`)
      }
    }
    return instance
  }

  setDefaultAdapter(adapter: IAdapter) {
    this.defaultAdatper = adapter
  }
}

export const HMSService = new HMSServiceFactory()
