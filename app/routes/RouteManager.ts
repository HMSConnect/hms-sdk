import * as _ from 'lodash'

type RouteMode = 'full' | 'widget'

class RouteManager {
  private mode: RouteMode | null = null

  registryMode(pathName: string) {
    const isWidget = _.includes(pathName, 'embeded-widget')
    if (isWidget) {
      this.mode = 'widget'
    } else {
      this.mode = 'full'
    }
    console.info('entering mode: ', this.mode)
  }

  getPath(path: string, isURL: boolean = false) {
    if (this.mode === 'widget') {
      return `${isURL ? '/' : ''}embeded-widget/${path}`
    }
    return `${isURL ? '/' : ''}${path}`
  }
}

export default new RouteManager()
