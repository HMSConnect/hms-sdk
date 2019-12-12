import React, { useState } from 'react'

import { Button, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import * as _ from 'lodash'

import routes from '../../../routes'
import EncounterService from '../../../services/EncounterService'
import { HMSService } from '../../../services/HMSServiceFactory'
import { IHeaderCellProps } from '../../base/EnhancedTableHead'
import useLazyLoad, { ILazyLoadOption } from '../../hooks/useLazyLoad'
import DiagReportPatientData from '../DiagReportPatientData'
import PatientEncounterList from '../PatientEncounterList'

const useStyles = makeStyles((theme: Theme) => ({
  listRoot: {
    height: '60vh',
    overflowY: 'scroll',
    width: '50em'
  },
  root: {
    justifyContent: 'center'
  }
}))

export interface IBodyCellProp {
  align: 'right' | 'left' | 'center'
  id: string
  styles?: any
}

export interface ITableCellProp {
  headCell: IHeaderCellProps
  bodyCell: IBodyCellProp
}

const PatientEncounterTimeline: React.FunctionComponent<{
  resourceList: any[]
  patient: any
}> = ({ resourceList, patient }) => {
  const classes = useStyles()
  const [lazyLoadOption, setLazyLoad] = useState<ILazyLoadOption>({
    filter: {
      patientId: _.get(patient, 'identifier.id.value')
    },
    max: 10
  })

  const {
    data,
    isLoading,
    setResult,
    isMore,
    setIsMore,
    setIsFetch
  } = useLazyLoad(resourceList, fetchMoreAsync)

  async function fetchMoreAsync() {
    const encounterService = HMSService.getService(
      'encounter'
    ) as EncounterService
    return await encounterService.list(lazyLoadOption)
  }

  const [diagReport, setDiagReport] = useState([])
  const handleEncounterSelect = async (
    event: React.MouseEvent,
    selectedEncounter: any
  ) => {
    routes.Router.replaceRoute(`patient-info/encounter`, {
      encounterId: _.get(selectedEncounter, 'id'),
      patientId: _.get(patient, 'identifier.id.value')
    })

    // const diagData: any = mockDiag
    // setDiagReport(diagData.data)
  }

  const handleLazyLoad = (event: any, type?: string) => {
    const lastEntry = _.last(data)
    setLazyLoad(prevLazyLoad => ({
      ...prevLazyLoad,
      filter: {
        ...prevLazyLoad.filter,
        periodStart_lt: _.get(lastEntry, 'startTime'),
        type: type ? type : prevLazyLoad.filter.type
      }
    }))
    setIsFetch(true)
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={10}>
          <Typography variant='h6'>Encounter</Typography>
        </Grid>
        <Grid item xs={10}>
          <div className={classes.listRoot}>
            <PatientEncounterList
              entryList={data}
              onEntrySelected={handleEncounterSelect}
            />
          </div>
        </Grid>
        {isMore ? (
          <Grid item xs={3}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleLazyLoad}
            >
              <Typography variant='body1'>Load More</Typography>
            </Button>
          </Grid>
        ) : null}
      </Grid>
      <DiagReportPatientData diagReportList={diagReport} />
    </>
  )
}

export default PatientEncounterTimeline

const mockDiag = {
  error: null,
  schema: {
    version: 1,
    standard: 'SFHIR',
    resourceType: 'diagnostic_report'
  },
  data: [
    {
      resourceType: 'DiagnosticReport',
      id: 'cca7e86a-14de-417c-9d16-ac992f0629c9',
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '57698-3',
            display: 'Lipid Panel'
          }
        ],
        text: 'Lipid Panel'
      },
      subject: {
        reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
      },
      context: {
        reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
      },
      effectiveDateTime: '2010-05-22T16:33:20+00:00',
      issued: '2010-05-22T16:33:20.246+00:00',
      result: [
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          display: 'Blood Pressure',
          resourceType: 'Observation',
          id: 'fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'vital-signs',
                  display: 'vital-signs'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '55284-4',
                display: 'Blood Pressure'
              }
            ],
            text: 'Blood Pressure'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-22T16:33:20+00:00',
          issued: '2010-05-22T16:33:20.246+00:00',
          component: [
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8462-4',
                    display: 'Diastolic Blood Pressure'
                  }
                ],
                text: 'Diastolic Blood Pressure'
              },
              valueQuantity: {
                value: 86.82903497465973,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            },
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8480-6',
                    display: 'Systolic Blood Pressure'
                  }
                ],
                text: 'Systolic Blood Pressure'
              },
              valueQuantity: {
                value: 101.1578775618944,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            }
          ],
          _id: '6b1f5a67f9c64d59b9a119002018031e'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          display: 'Total Cholesterol',
          resourceType: 'Observation',
          id: 'aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2093-3',
                display: 'Total Cholesterol'
              }
            ],
            text: 'Total Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-22T16:33:20+00:00',
          issued: '2010-05-22T16:33:20.246+00:00',
          valueQuantity: {
            value: 188.34585048203817,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '9cffd1d81a4e48efaabb86086ea9fefb'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          display: 'Triglycerides',
          resourceType: 'Observation',
          id: '790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2571-8',
                display: 'Triglycerides'
              }
            ],
            text: 'Triglycerides'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-22T16:33:20+00:00',
          issued: '2010-05-22T16:33:20.246+00:00',
          valueQuantity: {
            value: 126.79745732943869,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '5d24fe8e771b46c3ac67f62634e1f106'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/b7ad09e9-df7b-46f7-856d-368c805354e6',
          display: 'Low Density Lipoprotein Cholesterol',
          resourceType: 'Observation',
          id: 'b7ad09e9-df7b-46f7-856d-368c805354e6',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '18262-6',
                display: 'Low Density Lipoprotein Cholesterol'
              }
            ],
            text: 'Low Density Lipoprotein Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-22T16:33:20+00:00',
          issued: '2010-05-22T16:33:20.246+00:00',
          valueQuantity: {
            value: 90.38762529814086,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '521fdc50410a45c18beb9349c5797751'
        }
      ],
      _id: '7c96f4c55693419fba7f3adc74ec9a1e'
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'o1-cca7e86a-14de-417c-9d16-ac992f0629c9',
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '57698-3',
            display: 'Lipid Panel'
          }
        ],
        text: 'Lipid Panel'
      },
      subject: {
        reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
      },
      context: {
        reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
      },
      effectiveDateTime: '2010-05-23T16:33:20+00:00',
      issued: '2010-05-23T16:33:20.246+00:00',
      result: [
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          display: 'Blood Pressure',
          resourceType: 'Observation',
          id: 'fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'vital-signs',
                  display: 'vital-signs'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '55284-4',
                display: 'Blood Pressure'
              }
            ],
            text: 'Blood Pressure'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-23T16:33:20+00:00',
          issued: '2010-05-23T16:33:20.246+00:00',
          component: [
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8462-4',
                    display: 'Diastolic Blood Pressure'
                  }
                ],
                text: 'Diastolic Blood Pressure'
              },
              valueQuantity: {
                value: 86.82903497465973,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            },
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8480-6',
                    display: 'Systolic Blood Pressure'
                  }
                ],
                text: 'Systolic Blood Pressure'
              },
              valueQuantity: {
                value: 101.1578775618944,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            }
          ],
          _id: '6b1f5a67f9c64d59b9a119002018031e'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          display: 'Total Cholesterol',
          resourceType: 'Observation',
          id: 'aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2093-3',
                display: 'Total Cholesterol'
              }
            ],
            text: 'Total Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-23T16:33:20+00:00',
          issued: '2010-05-23T16:33:20.246+00:00',
          valueQuantity: {
            value: 188.34585048203817,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '9cffd1d81a4e48efaabb86086ea9fefb'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          display: 'Triglycerides',
          resourceType: 'Observation',
          id: '790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2571-8',
                display: 'Triglycerides'
              }
            ],
            text: 'Triglycerides'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-23T16:33:20+00:00',
          issued: '2010-05-23T16:33:20.246+00:00',
          valueQuantity: {
            value: 126.79745732943869,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '5d24fe8e771b46c3ac67f62634e1f106'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/b7ad09e9-df7b-46f7-856d-368c805354e6',
          display: 'Low Density Lipoprotein Cholesterol',
          resourceType: 'Observation',
          id: 'b7ad09e9-df7b-46f7-856d-368c805354e6',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '18262-6',
                display: 'Low Density Lipoprotein Cholesterol'
              }
            ],
            text: 'Low Density Lipoprotein Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-23T16:33:20+00:00',
          issued: '2010-05-23T16:33:20.246+00:00',
          valueQuantity: {
            value: 90.38762529814086,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '521fdc50410a45c18beb9349c5797751'
        }
      ],
      _id: '289d777dcfed4e74b1ee921de493e817'
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'o2-cca7e86a-14de-417c-9d16-ac992f0629c9',
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '57698-3',
            display: 'Lipid Panel'
          }
        ],
        text: 'Lipid Panel'
      },
      subject: {
        reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
      },
      context: {
        reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
      },
      effectiveDateTime: '2010-05-24T16:33:20+00:00',
      issued: '2010-05-24T16:33:20.246+00:00',
      result: [
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          display: 'Blood Pressure',
          resourceType: 'Observation',
          id: 'fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'vital-signs',
                  display: 'vital-signs'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '55284-4',
                display: 'Blood Pressure'
              }
            ],
            text: 'Blood Pressure'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-24T16:33:20+00:00',
          issued: '2010-05-24T16:33:20.246+00:00',
          component: [
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8462-4',
                    display: 'Diastolic Blood Pressure'
                  }
                ],
                text: 'Diastolic Blood Pressure'
              },
              valueQuantity: {
                value: 86.82903497465973,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            },
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8480-6',
                    display: 'Systolic Blood Pressure'
                  }
                ],
                text: 'Systolic Blood Pressure'
              },
              valueQuantity: {
                value: 101.1578775618944,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            }
          ],
          _id: '6b1f5a67f9c64d59b9a119002018031e'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          display: 'Total Cholesterol',
          resourceType: 'Observation',
          id: 'aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2093-3',
                display: 'Total Cholesterol'
              }
            ],
            text: 'Total Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-24T16:33:20+00:00',
          issued: '2010-05-24T16:33:20.246+00:00',
          valueQuantity: {
            value: 188.34585048203817,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '9cffd1d81a4e48efaabb86086ea9fefb'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          display: 'Triglycerides',
          resourceType: 'Observation',
          id: '790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2571-8',
                display: 'Triglycerides'
              }
            ],
            text: 'Triglycerides'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-24T16:33:20+00:00',
          issued: '2010-05-24T16:33:20.246+00:00',
          valueQuantity: {
            value: 126.79745732943869,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '5d24fe8e771b46c3ac67f62634e1f106'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/b7ad09e9-df7b-46f7-856d-368c805354e6',
          display: 'Low Density Lipoprotein Cholesterol',
          resourceType: 'Observation',
          id: 'b7ad09e9-df7b-46f7-856d-368c805354e6',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '18262-6',
                display: 'Low Density Lipoprotein Cholesterol'
              }
            ],
            text: 'Low Density Lipoprotein Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-24T16:33:20+00:00',
          issued: '2010-05-24T16:33:20.246+00:00',
          valueQuantity: {
            value: 90.38762529814086,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '521fdc50410a45c18beb9349c5797751'
        }
      ],
      _id: '8c82390d951b45b7bd733f6e07f47de0'
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'o3-cca7e86a-14de-417c-9d16-ac992f0629c9',
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '57698-3',
            display: 'Lipid Panel'
          }
        ],
        text: 'Lipid Panel'
      },
      subject: {
        reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
      },
      context: {
        reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
      },
      effectiveDateTime: '2010-05-25T16:33:20+00:00',
      issued: '2010-05-25T16:33:20.246+00:00',
      result: [
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          display: 'Blood Pressure',
          resourceType: 'Observation',
          id: 'fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'vital-signs',
                  display: 'vital-signs'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '55284-4',
                display: 'Blood Pressure'
              }
            ],
            text: 'Blood Pressure'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-25T16:33:20+00:00',
          issued: '2010-05-25T16:33:20.246+00:00',
          component: [
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8462-4',
                    display: 'Diastolic Blood Pressure'
                  }
                ],
                text: 'Diastolic Blood Pressure'
              },
              valueQuantity: {
                value: 86.82903497465973,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            },
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8480-6',
                    display: 'Systolic Blood Pressure'
                  }
                ],
                text: 'Systolic Blood Pressure'
              },
              valueQuantity: {
                value: 101.1578775618944,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            }
          ],
          _id: '6b1f5a67f9c64d59b9a119002018031e'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          display: 'Total Cholesterol',
          resourceType: 'Observation',
          id: 'aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2093-3',
                display: 'Total Cholesterol'
              }
            ],
            text: 'Total Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-25T16:33:20+00:00',
          issued: '2010-05-25T16:33:20.246+00:00',
          valueQuantity: {
            value: 188.34585048203817,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '9cffd1d81a4e48efaabb86086ea9fefb'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          display: 'Triglycerides',
          resourceType: 'Observation',
          id: '790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2571-8',
                display: 'Triglycerides'
              }
            ],
            text: 'Triglycerides'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-25T16:33:20+00:00',
          issued: '2010-05-25T16:33:20.246+00:00',
          valueQuantity: {
            value: 126.79745732943869,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '5d24fe8e771b46c3ac67f62634e1f106'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/b7ad09e9-df7b-46f7-856d-368c805354e6',
          display: 'Low Density Lipoprotein Cholesterol',
          resourceType: 'Observation',
          id: 'b7ad09e9-df7b-46f7-856d-368c805354e6',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '18262-6',
                display: 'Low Density Lipoprotein Cholesterol'
              }
            ],
            text: 'Low Density Lipoprotein Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-25T16:33:20+00:00',
          issued: '2010-05-25T16:33:20.246+00:00',
          valueQuantity: {
            value: 90.38762529814086,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '521fdc50410a45c18beb9349c5797751'
        }
      ],
      _id: '9567efa7fb514b3fa992a85e638ba561'
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'o4-cca7e86a-14de-417c-9d16-ac992f0629c9',
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '57698-3',
            display: 'Lipid Panel'
          }
        ],
        text: 'Lipid Panel'
      },
      subject: {
        reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
      },
      context: {
        reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
      },
      effectiveDateTime: '2010-05-26T16:33:20+00:00',
      issued: '2010-05-26T16:33:20.246+00:00',
      result: [
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          display: 'Blood Pressure',
          resourceType: 'Observation',
          id: 'fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'vital-signs',
                  display: 'vital-signs'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '55284-4',
                display: 'Blood Pressure'
              }
            ],
            text: 'Blood Pressure'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-26T16:33:20+00:00',
          issued: '2010-05-26T16:33:20.246+00:00',
          component: [
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8462-4',
                    display: 'Diastolic Blood Pressure'
                  }
                ],
                text: 'Diastolic Blood Pressure'
              },
              valueQuantity: {
                value: 86.82903497465973,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            },
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8480-6',
                    display: 'Systolic Blood Pressure'
                  }
                ],
                text: 'Systolic Blood Pressure'
              },
              valueQuantity: {
                value: 101.1578775618944,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            }
          ],
          _id: '6b1f5a67f9c64d59b9a119002018031e'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          display: 'Total Cholesterol',
          resourceType: 'Observation',
          id: 'aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2093-3',
                display: 'Total Cholesterol'
              }
            ],
            text: 'Total Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-26T16:33:20+00:00',
          issued: '2010-05-26T16:33:20.246+00:00',
          valueQuantity: {
            value: 188.34585048203817,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '9cffd1d81a4e48efaabb86086ea9fefb'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          display: 'Triglycerides',
          resourceType: 'Observation',
          id: '790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2571-8',
                display: 'Triglycerides'
              }
            ],
            text: 'Triglycerides'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-26T16:33:20+00:00',
          issued: '2010-05-26T16:33:20.246+00:00',
          valueQuantity: {
            value: 126.79745732943869,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '5d24fe8e771b46c3ac67f62634e1f106'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/b7ad09e9-df7b-46f7-856d-368c805354e6',
          display: 'Low Density Lipoprotein Cholesterol',
          resourceType: 'Observation',
          id: 'b7ad09e9-df7b-46f7-856d-368c805354e6',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '18262-6',
                display: 'Low Density Lipoprotein Cholesterol'
              }
            ],
            text: 'Low Density Lipoprotein Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-26T16:33:20+00:00',
          issued: '2010-05-26T16:33:20.246+00:00',
          valueQuantity: {
            value: 90.38762529814086,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '521fdc50410a45c18beb9349c5797751'
        }
      ],
      _id: 'c1cbc6dd31e644d0810409c528e67c3a'
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'o5-cca7e86a-14de-417c-9d16-ac992f0629c9',
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '57698-3',
            display: 'Lipid Panel'
          }
        ],
        text: 'Lipid Panel'
      },
      subject: {
        reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
      },
      context: {
        reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
      },
      effectiveDateTime: '2010-05-27T16:33:20+00:00',
      issued: '2010-05-27T16:33:20.246+00:00',
      result: [
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          display: 'Blood Pressure',
          resourceType: 'Observation',
          id: 'fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'vital-signs',
                  display: 'vital-signs'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '55284-4',
                display: 'Blood Pressure'
              }
            ],
            text: 'Blood Pressure'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-27T16:33:20+00:00',
          issued: '2010-05-27T16:33:20.246+00:00',
          component: [
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8462-4',
                    display: 'Diastolic Blood Pressure'
                  }
                ],
                text: 'Diastolic Blood Pressure'
              },
              valueQuantity: {
                value: 86.82903497465973,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            },
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8480-6',
                    display: 'Systolic Blood Pressure'
                  }
                ],
                text: 'Systolic Blood Pressure'
              },
              valueQuantity: {
                value: 101.1578775618944,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            }
          ],
          _id: '6b1f5a67f9c64d59b9a119002018031e'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          display: 'Total Cholesterol',
          resourceType: 'Observation',
          id: 'aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2093-3',
                display: 'Total Cholesterol'
              }
            ],
            text: 'Total Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-27T16:33:20+00:00',
          issued: '2010-05-27T16:33:20.246+00:00',
          valueQuantity: {
            value: 188.34585048203817,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '9cffd1d81a4e48efaabb86086ea9fefb'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          display: 'Triglycerides',
          resourceType: 'Observation',
          id: '790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2571-8',
                display: 'Triglycerides'
              }
            ],
            text: 'Triglycerides'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-27T16:33:20+00:00',
          issued: '2010-05-27T16:33:20.246+00:00',
          valueQuantity: {
            value: 126.79745732943869,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '5d24fe8e771b46c3ac67f62634e1f106'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/b7ad09e9-df7b-46f7-856d-368c805354e6',
          display: 'Low Density Lipoprotein Cholesterol',
          resourceType: 'Observation',
          id: 'b7ad09e9-df7b-46f7-856d-368c805354e6',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '18262-6',
                display: 'Low Density Lipoprotein Cholesterol'
              }
            ],
            text: 'Low Density Lipoprotein Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-27T16:33:20+00:00',
          issued: '2010-05-27T16:33:20.246+00:00',
          valueQuantity: {
            value: 90.38762529814086,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '521fdc50410a45c18beb9349c5797751'
        }
      ],
      _id: 'e5dae14cd08644198c6537401ff977ca'
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'o6-cca7e86a-14de-417c-9d16-ac992f0629c9',
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '57698-3',
            display: 'Lipid Panel'
          }
        ],
        text: 'Lipid Panel'
      },
      subject: {
        reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
      },
      context: {
        reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
      },
      effectiveDateTime: '2010-05-28T16:33:20+00:00',
      issued: '2010-05-28T16:33:20.246+00:00',
      result: [
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          display: 'Blood Pressure',
          resourceType: 'Observation',
          id: 'fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'vital-signs',
                  display: 'vital-signs'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '55284-4',
                display: 'Blood Pressure'
              }
            ],
            text: 'Blood Pressure'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-28T16:33:20+00:00',
          issued: '2010-05-28T16:33:20.246+00:00',
          component: [
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8462-4',
                    display: 'Diastolic Blood Pressure'
                  }
                ],
                text: 'Diastolic Blood Pressure'
              },
              valueQuantity: {
                value: 86.82903497465973,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            },
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8480-6',
                    display: 'Systolic Blood Pressure'
                  }
                ],
                text: 'Systolic Blood Pressure'
              },
              valueQuantity: {
                value: 101.1578775618944,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            }
          ],
          _id: '6b1f5a67f9c64d59b9a119002018031e'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          display: 'Total Cholesterol',
          resourceType: 'Observation',
          id: 'aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2093-3',
                display: 'Total Cholesterol'
              }
            ],
            text: 'Total Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-28T16:33:20+00:00',
          issued: '2010-05-28T16:33:20.246+00:00',
          valueQuantity: {
            value: 188.34585048203817,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '9cffd1d81a4e48efaabb86086ea9fefb'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          display: 'Triglycerides',
          resourceType: 'Observation',
          id: '790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2571-8',
                display: 'Triglycerides'
              }
            ],
            text: 'Triglycerides'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-28T16:33:20+00:00',
          issued: '2010-05-28T16:33:20.246+00:00',
          valueQuantity: {
            value: 126.79745732943869,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '5d24fe8e771b46c3ac67f62634e1f106'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/b7ad09e9-df7b-46f7-856d-368c805354e6',
          display: 'Low Density Lipoprotein Cholesterol',
          resourceType: 'Observation',
          id: 'b7ad09e9-df7b-46f7-856d-368c805354e6',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '18262-6',
                display: 'Low Density Lipoprotein Cholesterol'
              }
            ],
            text: 'Low Density Lipoprotein Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-28T16:33:20+00:00',
          issued: '2010-05-28T16:33:20.246+00:00',
          valueQuantity: {
            value: 90.38762529814086,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '521fdc50410a45c18beb9349c5797751'
        }
      ],
      _id: '178ddfe21bf741388a9f4be5e46ac5fa'
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'o7-cca7e86a-14de-417c-9d16-ac992f0629c9',
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '57698-3',
            display: 'Lipid Panel'
          }
        ],
        text: 'Lipid Panel'
      },
      subject: {
        reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
      },
      context: {
        reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
      },
      effectiveDateTime: '2010-05-29T16:33:20+00:00',
      issued: '2010-05-29T16:33:20.246+00:00',
      result: [
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          display: 'Blood Pressure',
          resourceType: 'Observation',
          id: 'fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'vital-signs',
                  display: 'vital-signs'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '55284-4',
                display: 'Blood Pressure'
              }
            ],
            text: 'Blood Pressure'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-29T16:33:20+00:00',
          issued: '2010-05-29T16:33:20.246+00:00',
          component: [
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8462-4',
                    display: 'Diastolic Blood Pressure'
                  }
                ],
                text: 'Diastolic Blood Pressure'
              },
              valueQuantity: {
                value: 86.82903497465973,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            },
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8480-6',
                    display: 'Systolic Blood Pressure'
                  }
                ],
                text: 'Systolic Blood Pressure'
              },
              valueQuantity: {
                value: 101.1578775618944,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            }
          ],
          _id: '6b1f5a67f9c64d59b9a119002018031e'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          display: 'Total Cholesterol',
          resourceType: 'Observation',
          id: 'aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2093-3',
                display: 'Total Cholesterol'
              }
            ],
            text: 'Total Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-29T16:33:20+00:00',
          issued: '2010-05-29T16:33:20.246+00:00',
          valueQuantity: {
            value: 188.34585048203817,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '9cffd1d81a4e48efaabb86086ea9fefb'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          display: 'Triglycerides',
          resourceType: 'Observation',
          id: '790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2571-8',
                display: 'Triglycerides'
              }
            ],
            text: 'Triglycerides'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-29T16:33:20+00:00',
          issued: '2010-05-29T16:33:20.246+00:00',
          valueQuantity: {
            value: 126.79745732943869,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '5d24fe8e771b46c3ac67f62634e1f106'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/b7ad09e9-df7b-46f7-856d-368c805354e6',
          display: 'Low Density Lipoprotein Cholesterol',
          resourceType: 'Observation',
          id: 'b7ad09e9-df7b-46f7-856d-368c805354e6',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '18262-6',
                display: 'Low Density Lipoprotein Cholesterol'
              }
            ],
            text: 'Low Density Lipoprotein Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-29T16:33:20+00:00',
          issued: '2010-05-29T16:33:20.246+00:00',
          valueQuantity: {
            value: 90.38762529814086,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '521fdc50410a45c18beb9349c5797751'
        }
      ],
      _id: '19fdb4fc55204e8c92b657ebb422f8a4'
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'o8-cca7e86a-14de-417c-9d16-ac992f0629c9',
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '57698-3',
            display: 'Lipid Panel'
          }
        ],
        text: 'Lipid Panel'
      },
      subject: {
        reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
      },
      context: {
        reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
      },
      effectiveDateTime: '2010-05-30T16:33:20+00:00',
      issued: '2010-05-30T16:33:20.246+00:00',
      result: [
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          display: 'Blood Pressure',
          resourceType: 'Observation',
          id: 'fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'vital-signs',
                  display: 'vital-signs'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '55284-4',
                display: 'Blood Pressure'
              }
            ],
            text: 'Blood Pressure'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-30T16:33:20+00:00',
          issued: '2010-05-30T16:33:20.246+00:00',
          component: [
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8462-4',
                    display: 'Diastolic Blood Pressure'
                  }
                ],
                text: 'Diastolic Blood Pressure'
              },
              valueQuantity: {
                value: 86.82903497465973,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            },
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8480-6',
                    display: 'Systolic Blood Pressure'
                  }
                ],
                text: 'Systolic Blood Pressure'
              },
              valueQuantity: {
                value: 101.1578775618944,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            }
          ],
          _id: '6b1f5a67f9c64d59b9a119002018031e'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          display: 'Total Cholesterol',
          resourceType: 'Observation',
          id: 'aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2093-3',
                display: 'Total Cholesterol'
              }
            ],
            text: 'Total Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-30T16:33:20+00:00',
          issued: '2010-05-30T16:33:20.246+00:00',
          valueQuantity: {
            value: 188.34585048203817,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '9cffd1d81a4e48efaabb86086ea9fefb'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          display: 'Triglycerides',
          resourceType: 'Observation',
          id: '790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2571-8',
                display: 'Triglycerides'
              }
            ],
            text: 'Triglycerides'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-30T16:33:20+00:00',
          issued: '2010-05-30T16:33:20.246+00:00',
          valueQuantity: {
            value: 126.79745732943869,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '5d24fe8e771b46c3ac67f62634e1f106'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/b7ad09e9-df7b-46f7-856d-368c805354e6',
          display: 'Low Density Lipoprotein Cholesterol',
          resourceType: 'Observation',
          id: 'b7ad09e9-df7b-46f7-856d-368c805354e6',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '18262-6',
                display: 'Low Density Lipoprotein Cholesterol'
              }
            ],
            text: 'Low Density Lipoprotein Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-30T16:33:20+00:00',
          issued: '2010-05-30T16:33:20.246+00:00',
          valueQuantity: {
            value: 90.38762529814086,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '521fdc50410a45c18beb9349c5797751'
        }
      ],
      _id: 'f7f79b265e0a4cf6ae9554d31b6d1e96'
    },
    {
      resourceType: 'DiagnosticReport',
      id: 'o9-cca7e86a-14de-417c-9d16-ac992f0629c9',
      status: 'final',
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '57698-3',
            display: 'Lipid Panel'
          }
        ],
        text: 'Lipid Panel'
      },
      subject: {
        reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
      },
      context: {
        reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
      },
      effectiveDateTime: '2010-05-31T16:33:20+00:00',
      issued: '2010-05-31T16:33:20.246+00:00',
      result: [
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          display: 'Blood Pressure',
          resourceType: 'Observation',
          id: 'fdb9875d-9b67-4ee2-b2cb-52fab393cc78',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'vital-signs',
                  display: 'vital-signs'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '55284-4',
                display: 'Blood Pressure'
              }
            ],
            text: 'Blood Pressure'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-31T16:33:20+00:00',
          issued: '2010-05-31T16:33:20.246+00:00',
          component: [
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8462-4',
                    display: 'Diastolic Blood Pressure'
                  }
                ],
                text: 'Diastolic Blood Pressure'
              },
              valueQuantity: {
                value: 86.82903497465973,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            },
            {
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '8480-6',
                    display: 'Systolic Blood Pressure'
                  }
                ],
                text: 'Systolic Blood Pressure'
              },
              valueQuantity: {
                value: 101.1578775618944,
                unit: 'mmHg',
                system: 'http://unitsofmeasure.org',
                code: 'mmHg'
              }
            }
          ],
          _id: '6b1f5a67f9c64d59b9a119002018031e'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          display: 'Total Cholesterol',
          resourceType: 'Observation',
          id: 'aa3c47bc-eac5-4f85-9d8d-2df681b8f128',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2093-3',
                display: 'Total Cholesterol'
              }
            ],
            text: 'Total Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-31T16:33:20+00:00',
          issued: '2010-05-31T16:33:20.246+00:00',
          valueQuantity: {
            value: 188.34585048203817,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '9cffd1d81a4e48efaabb86086ea9fefb'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          display: 'Triglycerides',
          resourceType: 'Observation',
          id: '790dd0e6-80c2-416d-8b95-5d4772bf7af4',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '2571-8',
                display: 'Triglycerides'
              }
            ],
            text: 'Triglycerides'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-31T16:33:20+00:00',
          issued: '2010-05-31T16:33:20.246+00:00',
          valueQuantity: {
            value: 126.79745732943869,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '5d24fe8e771b46c3ac67f62634e1f106'
        },
        {
          schema: {
            version: 1,
            standard: 'SFHIR',
            resourceType: 'observation'
          },
          reference: 'Observation/b7ad09e9-df7b-46f7-856d-368c805354e6',
          display: 'Low Density Lipoprotein Cholesterol',
          resourceType: 'Observation',
          id: 'b7ad09e9-df7b-46f7-856d-368c805354e6',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://hl7.org/fhir/observation-category',
                  code: 'laboratory',
                  display: 'laboratory'
                }
              ]
            }
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '18262-6',
                display: 'Low Density Lipoprotein Cholesterol'
              }
            ],
            text: 'Low Density Lipoprotein Cholesterol'
          },
          subject: {
            reference: 'Patient/ddf5ae5c-5646-4a76-9efd-f7e697f3b728'
          },
          context: {
            reference: 'Encounter/65787ab8-63e4-4927-9a6c-66c51a10c97c'
          },
          effectiveDateTime: '2010-05-31T16:33:20+00:00',
          issued: '2010-05-31T16:33:20.246+00:00',
          valueQuantity: {
            value: 90.38762529814086,
            unit: 'mg/dL',
            system: 'http://unitsofmeasure.org',
            code: 'mg/dL'
          },
          _id: '521fdc50410a45c18beb9349c5797751'
        }
      ],
      _id: 'b196d20a3ed2471c95f56b9186feb48a'
    }
  ],
  totalCount: 10
}
