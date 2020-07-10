export default interface IAdapter {
  doRequest(resource: string, params: any): Promise<any>
  setConfig?(hms: any): void
  login?(authData: any, callback: any): void
}
