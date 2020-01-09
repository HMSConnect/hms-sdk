const nextRoutes = require('next-routes')

module.exports = nextRoutes()
  .add('index')
  .add('patient-info', '/patient-info/:patientId')
  .add('patient-search')
  .add(
    'patient-info/encounter',
    '/patient-info/:patientId/encounter/:encounterId'
  )
  .add('embedded-widget')
  .add(
    'embedded-widget/patient-search-bar',
    '/embedded-widget/patient-search-bar'
  )
  .add(
    'embedded-widget/patient-search-result',
    '/embedded-widget/patient-search-result'
  )
  .add('embedded-widget/patient-search')
  .add(
    'embedded-widget/patient-info/encounter',
    '/embedded-widget/patient-info/:patientId/encounter/:encounterId'
  )
  .add(
    'embedded-widget/patient-info/encounter-timeline',
    '/embedded-widget/patient-info/encounter-timeline/:patientId',
    'embedded-widget/patient-info/patient-encounter-timeline'
  )
  .add('embedded-widget/patient-info', '/embedded-widget/patient-info/:patientId')
  .add(
    'embedded-widget/medical-records',
    '/embedded-widget/medical-records',
    'embedded-widget/medical-records'
  )
  .add(
    'embedded-widget/medical-records/diagnostic-report-card',
    '/embedded-widget/medical-records/diagnostic-report-card',
    'embedded-widget/medical-records/diagnostic-report-card'
  )