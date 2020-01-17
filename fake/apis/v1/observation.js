const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const utilService = require('../../services/utils')
const observationService = require('../../services/observation')
const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['observation']) {
      const selector = req.query.filter
        ? observationService.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? observationService.createOptions(req.query)
        : {}

      db['observation'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: {
              ...config.defaultSchema,
              resourceType: 'observation'
            },
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

router.get('/category', (req, res) => {
  try {
    if (db['observation']) {
      const selector = req.query.filter
        ? observationService.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? observationService.createOptions(req.query)
        : {}
      // force limit for find all type
      db['observation'].find(selector, { ...options, limit: null }).fetch(
        results => {
          res.json({
            error: null,
            schema: { ...config.defaultSchema, resourceType: 'observation' },
            data: observationService.parseToObservation(results)
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
