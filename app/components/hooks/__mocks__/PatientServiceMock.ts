class PatientServiceMock {
  async load(id: string): Promise<any> {
    return Promise.resolve({
      data: {
        birth: '2018/11/11',
        name: 'test',
      },
      error: null,
      totalCount: 1,
    })
  }

  async list(params: any): Promise<any> {
    return Promise.resolve({
      data: [
        {
          birth: '2018/11/11',
          name: 'test1',
        },
        {
          birth: '2019/01/01',
          name: 'test2',
        },
      ],
      error: null,
      totalCount: 2,
    })
  }

  async resourceList(params?: any): Promise<any> {
    return Promise.resolve({
      data: [
        { resourceType: 'patient', totalCount: 1, data: [] },
        {
          data: [
            {
              type: 'ADMS',
            },
            {
              type: 'EECM',
            },
          ],
          resourceType: 'encounter',
          totalCount: 2,
        },
      ],
      error: null,
    })
  }
}

export default new PatientServiceMock()
