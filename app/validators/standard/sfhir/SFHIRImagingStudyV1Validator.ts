import IValidator from '@validators/IValidator'

class SFHIRImagingStudyV1Validator implements IValidator {
  isValid(schema: any): boolean {
    return (
      schema.standard === 'SFHIR' &&
      schema.version === 1 &&
      schema.resourceType === 'imaging_study'
    )
  }

  parse(imagingStudy: any): any {
    return imagingStudy
  }
}

export default SFHIRImagingStudyV1Validator
