import * as React from 'react'

import AdaptiveCard from '@components/base/AdaptiveCard'
import useAllergyIntoleranceList from '@components/hooks/useAllergyIntoleranceList'
import allergyIntolerance from '@components/templates/adaptive-card/allergy.template.json'
import { IAllergyIntoleranceListFilterQuery } from '@data-managers/AllergyIntoleranceDataManager'
import { Paper } from '@material-ui/core'
import { parse } from '@utils'
import * as _ from 'lodash'
import { useRouter } from 'next/router'
import { stringify } from 'qs'

export const AllergyIntoleranceCard: React.FunctionComponent<any> = () => {
  const { query: routerQuery } = useRouter()
  const query = parse(stringify(routerQuery))
  const params = {
    patientId: query.patientId,
  } as IAllergyIntoleranceListFilterQuery

  const { isLoading, data: allergyList, error } = useAllergyIntoleranceList({
    filter: params || {},
  })

  const myscroll = React.useRef<HTMLDivElement | null>(null)

  // const { data: allergyList, error, isLoading, setIsFetch } = useInfinitScroll(
  //   myscroll.current,
  //   fetchMoreAsync,
  // )

  // React.useEffect(() => {
  //   setIsFetch(true)
  // }, [])

  // async function fetchMoreAsync(lastEntry: any) {
  //   const allergyIntoleranceService = HMSService.getService(
  //     'allergy_intolerance',
  //   ) as AllergyIntoleranceService
  //   const newLazyLoad = {
  //     filter: {
  //       patientId: params.patientId,
  //       assertedDate_lt: _.get(lastEntry, 'assertedDate'),
  //     },
  //     max: 10,
  //   }
  //   const entryData = await allergyIntoleranceService.list(newLazyLoad)
  //   if (_.get(entryData, 'error')) {
  //     sendMessage({
  //       error: _.get(entryData, 'error'),
  //     })
  //     return Promise.reject(new Error(entryData.error))
  //   }

  //   sendMessage({
  //     message: 'handleLoadMore',
  //     params: newLazyLoad,
  //   })

  //   return Promise.resolve(_.get(entryData, 'data'))
  // }

  if (error) {
    return <div>ERR: {error}.</div>
  }

  if (isLoading) {
    return <div>loading...</div>
  }
  return (
    <>
      <AllergyIntoleranceCardView
        scrollRef={myscroll}
        allergyList={allergyList}
        isShowAction={false}
      />
    </>
  )
}

export const AllergyIntoleranceCardView: React.FunctionComponent<any> = ({
  templatePayload,
  allergyList,
  isShowAction = true,
  onClick,
  scrollRef,
}) => {
  const data = {
    results: _.map(allergyList, allergy => {
      let styleCriticality
      switch (allergy.criticality) {
        case 'low':
          styleCriticality = 'Defalut'
          break
        case 'high':
          styleCriticality = 'Warning'
          break
        case 'unable-to-assess':
          styleCriticality = 'Attention'
          break
        default:
          styleCriticality = 'Defalut'
          break
      }

      return {
        assertedDate: _.get(allergy, 'assertedDateText'),
        category: _.get(allergy, 'category'),
        criticality: styleCriticality,
        display: _.get(allergy, 'codeText'),
      }
    }),
    title: `Allergy`,
  }
  return (
    <Paper ref={scrollRef} style={{ height: '100%', overflowY: 'auto' }}>
      <AdaptiveCard
        data={{
          ...data,
          isShowAction,
        }}
        templatePayload={templatePayload}
        onExecuteAction={onClick}
      />
    </Paper>
  )
}

AllergyIntoleranceCardView.defaultProps = {
  templatePayload: allergyIntolerance,
}

export default AllergyIntoleranceCard
