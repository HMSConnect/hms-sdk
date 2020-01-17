const moment = require('moment')
const utilService = require('./utils')

exports.createSelector = (filter = {}) => {
  const selector = {}
  const andSelector = []

  if (filter.patientId) {
    andSelector.push({ 'subject.reference': `Patient/${filter.patientId}` })
  }

  if (filter.encounterId) {
    andSelector.push({ 'context.reference': `Encounter/${filter.encounterId}` })
  }

  if (filter.categoryCode) {
    andSelector.push({ 'category.coding.code': filter.categoryCode })
  }

  if (filter.issued_lt) {
    //minimongo can't upsert date, so I filter by ISOString date.
    andSelector.push({
      '__mock_meta.issued': {
        $lt: filter.issued_lt
      }
    })
  }

  if (andSelector.length > 0) {
    selector['$and'] = andSelector
  }
  return selector
}

exports.createOptions = (query, options = {}) => {
  options = { ...utilService.createOptions(query), ...options }
  const { orderBy, order } = query.sort || {}

  if (query._lasted) {
    options.limit = 1
  } else {
    options.limit = query.max ? Number(query.max) : 10
  }
  options.sort = [[orderBy || `__mock_meta.issued`, order || 'desc']]
  return options
}

exports.processingPredata = data => {
  const __mock_meta = {}

  if (data.issued) {
    const issued = moment(data.issued).toDate()
    __mock_meta.issued = issued
  }

  return {
    ...data,
    __mock_meta
  }
}

exports.parseToObservation = (observations = []) => {
  const groupObservationsByType = {}
  for (const observation of observations) {
    const category = observation.category[0].coding[0].display

    if (!groupObservationsByType[category]) {
      groupObservationsByType[category] = {
        type: category,
        totalCount: 0
      }
    }
    groupObservationsByType[category].totalCount += 1
  }
  return Object.values(groupObservationsByType)
}
