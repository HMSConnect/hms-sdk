const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const allergyIntolerance = require('../../services/allergy_intolerance')
const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['allergy_intolerance']) {
      const selector = req.query.filter
        ? allergyIntolerance.createSelector(req.query.filter)
        : {}
      const options = req.query
        ? allergyIntolerance.createOptions(req.query)
        : {}

      db['allergy_intolerance'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: {
              ...config.defaultSchema,
              resourceType: 'allergy_intolerance'
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

module.exports = router
