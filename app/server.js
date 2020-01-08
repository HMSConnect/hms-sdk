const next = require('next')
const routes = require('./routes.js')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)

const port = 3000
const { createServer } = require('http')
app.prepare().then(() => {
  createServer(handler).listen(port)
})
