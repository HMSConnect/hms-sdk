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
