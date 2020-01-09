// const moment = require('moment')

exports.createSelector = (filter = {}) => {
  const selector = {}
  const andSelector = []

  if (filter.patientId) {
    andSelector.push({ 'patient.reference': `Patient/${filter.patientId}` })
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
  const { orderBy, order } = query.sort || {}

  options.limit = query.max ? Number(query.max) : 10
  options.sort = [[orderBy || `__mock_meta.period.start`, order || 'desc']]
  return options
}

exports.processingPredata = data => {
  const __mock_meta = {}

  //   if (data.period) {
  //     const periodStart = moment(data.period.start).toDate()
  //     __mock_meta.period = { start: periodStart }
  //   }

  return {
    ...data,
    __mock_meta
  }
}
