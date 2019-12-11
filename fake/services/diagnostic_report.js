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

  if (andSelector.length > 0) {
    selector['$and'] = andSelector
  }
  return selector
}

exports.createOptions = (query, options = {}) => {
  query = utilService.createOptions(query)
  const { orderBy, order } = query.sort || {}

  if (query._lasted) {
    options.limit = 1
  }
  options.sort = [[orderBy || 'issued', order || 'desc']]
  // options.sort = [[orderBy || `__mock_meta.period.start`, order || 'desc']]
  return options
}
