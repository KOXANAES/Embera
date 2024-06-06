const Router = require('express')

const calcController = require('../controllers/calcController')

const authMiddleware = require('../middleware/authMiddleware')
const activatedMiddleware = require('../middleware/activatedMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const calcRouter = new Router()

calcRouter.post('/testcalc', calcController.testcalc)

module.exports = calcRouter