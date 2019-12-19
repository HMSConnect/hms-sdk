const nextRoutes = require('next-routes')

module.exports = nextRoutes()
  .add('index')
  .add('patient-info', '/patient-info/:id')
  .add('patient-search')
  .add(
    'patient-info/encounter',
    '/patient-info/:patientId/encounter/:encounterId'
  )
  .add(
    'patientInfoWithEncounter',
    '/:patientId/encounter/:encounterId',
    'patient-info/encounter'
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
  .add('embeded-widget/patient-info', '/embeded-widget/patient-info/:id')
