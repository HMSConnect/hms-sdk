const router = require('express').Router()

const mockStorage = require('../../storage')
const utilsService = require('../../services/utils')
const patientService = require('../../services/patient')

router.get('/', (req, res) => {
  try {

    const db = mockStorage.getDB()
    if (db['patient']) {
      const selector = req.query.filter
        ? patientService.createPatientSelector(req.query.filter)
        : {}
      const options = req.query
        ? patientService.createPatientOptions(
            req.query,
            utilsService.createOptions(req.query)
          )
        : {}

      db['patient'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            data: utilsService.createPaginate(results, req.query)
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
