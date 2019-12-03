const nextRoutes = require('next-routes')
const routes = nextRoutes()
  .add('index')
  .add('patient-info')
  .add('patient-search')

export const Link = routes.Link
export default routes
