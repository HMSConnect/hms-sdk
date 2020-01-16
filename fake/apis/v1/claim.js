const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const claimService = require('../../services/claim')
const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['claim']) {
      const selector = req.query.filter
        ? claimService.createSelector(req.query.filter)
        : {}
      const options = req.query ? claimService.createOptions(req.query) : {}

      db['claim'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: {
              ...config.defaultSchema,
              resourceType: 'claim'
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
