const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const utilsService = require('../../services/utils')
const encounterService = require('../../services/encounter')
const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['encounter']) {
      const selector = req.query.filter
        ? encounterService.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? encounterService.createOptions(
            req.query,
            utilsService.createOptions(req.query)
          )
        : {}

      db['encounter'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: { ...config.defaultSchema, resourceType: 'encounter' },
            data: results
          })
        },
        error => {
          throw error
        }
      )
    } else {
      throw new Error("The domain resource doesn't exist")
    }
  } catch (error) {
    console.error(error)
    res.json({ error: error.message, data: null })
  }
})

router.get('/type', (req, res) => {
  try {
    if (db['encounter']) {
      const selector = req.query.filter
        ? encounterService.createSelector(req.query.filter)
        : {}
      const options = req.query ? encounterService.createOptions(req.query) : {}
      // force limit for find all type
      db['encounter'].find(selector, { ...options, limit: null }).fetch(
        results => {
          res.json({
            error: null,
            schema: { ...config.defaultSchema, resourceType: 'encounter' },
            data: encounterService.parseToTypes(results)
          })
        },
        error => {
          throw error
        }
      )
    } else {
      throw new Error("The domain resource doesn't exist")
    }
  } catch (error) {
    console.error(error)
    res.json({ error: error.message, data: null })
  }
})

module.exports = router
