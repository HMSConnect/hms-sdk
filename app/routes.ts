const nextRoutes = require("next-routes");
const routes = nextRoutes()
  .add("index")
  .add("dashboard")
  .add("patient")
  .add("patientInfo");

export const Link = routes.Link;
export default routes;
