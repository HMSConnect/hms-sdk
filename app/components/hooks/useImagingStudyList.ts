import { IImagingStudyListQuery } from '@data-managers/ImagingStudyDataManager'
import { HMSService } from '@services/HMSServiceFactory'
import ImagingStudyService from '@services/ImagingStudyService'
import { IServiceResult } from '@utils/types'
import * as _ from 'lodash'
import usePromise from './utils/usePromise'

const useImagingStudyList = (
  options: IImagingStudyListQuery,
): IServiceResult => {
  return usePromise(() => {
    const imagingStudyService = HMSService.getService(
      'imaging_study',
    ) as ImagingStudyService
    return imagingStudyService.list(options)
  }, _.values(options.filter))
}

export default useImagingStudyList
