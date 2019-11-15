class DataAdapter {
  public host: string
  private environment: string

  constructor(environment: string) {
    this.environment = environment
    this.host = ''
    if (environment === 'development') {
      this.host = `${process.env.HMS_SANDBOX_URL}${process.env.HMS_SANDBOX_PORT}/smart_fhir`
    } else {
      // TODO: set host production
    }
  }
}

const dataAdapter = new DataAdapter(process.env.NODE_ENV)

export default dataAdapter
