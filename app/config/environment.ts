import { DependencyMode } from '@components/init/BootstrapWrapper'

interface IEnvironment {
  codeVersion: string
  googleApi: any
  iframe: any
  localFormat: any
  disableAuthen: boolean
  auth: any
  mode: DependencyMode
}

const environment: IEnvironment = {
  auth: {
    client_id: 'U490lixNTl1kv20thVvjDGa0',
  },
  codeVersion: '0.2.0',
  disableAuthen: false,
  googleApi: {
    ga: 'UA-161449395-1',
  },
  iframe: {
    targetOrigin: '*',
  },
  localFormat: {
    date: 'YYYY/MM/DD',
    dateTime: 'YYYY/MM/DD HH:mm',
    time: 'HH:mm',
  },
  mode: 'classic',
}

export default environment
