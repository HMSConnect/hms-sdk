const nextRoutes = require('next-routes')

module.exports = nextRoutes()
  .add('index')
  .add('patient-info', '/patient-info/:patientId')
  .add('patient-search')
  .add(
    'patient-info/encounter',
    '/patient-info/:patientId/encounter/:encounterId'
  )
  .add('embeded-widget')
  .add(
    'embeded-widget/patient-search-bar',
    '/embeded-widget/patient-search-bar'
  )
  .add(
    'embeded-widget/patient-search-result',
    '/embeded-widget/patient-search-result'
  )
  .add('embeded-widget/patient-search')
  .add(
    'embeded-widget/patient-info/encounter',
    '/embeded-widget/patient-info/:patientId/encounter/:encounterId'
  )
  .add(
    'embeded-widget/patient-info/encounter-timeline',
    '/embeded-widget/patient-info/encounter-timeline/:patientId',
    'embeded-widget/patient-info/patient-encounter-timeline'
  )
  .add('embeded-widget/patient-info', '/embeded-widget/patient-info/:patientId')