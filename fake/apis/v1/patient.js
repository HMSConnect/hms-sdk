const router = require('express').Router()

const config = require('../../config')
const mockStorage = require('../../storage')
const utilsService = require('../../services/utils')
const patientService = require('../../services/patient')
const encounterService = require('../../services/encounter')
const carePlanService = require('../../services/care_plan')
const conditionService = require('../../services/condition')

const db = mockStorage.getDB()

router.get('/', (req, res) => {
  try {
    if (db['patient']) {
      const selector = req.query.filter
        ? patientService.createSelector(req.query.filter)
        : {}
      const options = req.query ? patientService.createOptions(req.query) : {}

      db['patient'].find(selector, options).fetch(
        results => {
          res.json({
            error: null,
            schema: { ...config.defaultSchema, resourceType: 'patient' },
            ...utilsService.createPaginate(results, req.query)
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

router.get('/:id/resource-list', async (req, res) => {
  try {
    const domainResources = mockStorage
      .getDomainNameResourceList()
      .filter(domainResouce => domainResouce !== 'patient')

    const results = []
    for (const domainResouce of domainResources) {
      const entries = await new Promise((resolve, reject) => {
        let options = {}
        if (domainResouce === 'encounter') {
          options = encounterService.createOptions(req.query)
        } else if (domainResouce === 'care_plan') {
          options = carePlanService.createOptions(req.query)
        } else if (domainResouce === 'condition') {
          options = conditionService.createOptions(req.query)
        } else {
          options = utilsService.createOptions(req.query)
        }

        db[domainResouce]
          .find(
            {
              $or: [
                { 'subject.reference': `Patient/${req.params.id}` },
                { 'patient.reference': `Patient/${req.params.id}` }
              ]
            },
            { ...options, limit: null } //force limit, use createPaginate slice data instead of
          )
          .fetch(resolve, reject)
      })

      results.push({
        schema: { ...config.defaultSchema, resourceType: domainResouce },
        resourceType: domainResouce,
        ...utilsService.createPaginate(entries, req.query)
      })
    }

    res.json({
      error: null,
      schema: { ...config.defaultSchema, resourceType: 'patient' },
      data: results
    })
  } catch (error) {
    console.error(error)
    res.json({ error: error.message, data: null })
  }
})

module.exports = router
