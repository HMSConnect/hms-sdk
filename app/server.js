const next = require('next')
const routes = require('./routes.js')
const dev = process.env.NODE_ENV.trim() === 'development'
// const dev = process.env.NODE_ENV.trim() !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

const port = process.env.APP_PORT
const { createServer } = require('http')
app.prepare().then(() => {
  createServer(handler).listen(port)
})
