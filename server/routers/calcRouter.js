const Router = require('express')

const calcController = require('../controllers/calcController')

const authMiddleware = require('../middleware/authMiddleware')
const activatedMiddleware = require('../middleware/activatedMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const calcRouter = new Router()

calcRouter.post('/tvipg_1', authMiddleware, activatedMiddleware, calcController.tvipg_1)
calcRouter.post('/tvipg_3', authMiddleware, activatedMiddleware, calcController.tvipg_3)


module.exports = calcRouter