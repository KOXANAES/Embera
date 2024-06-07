const Router = require('express')

const techController = require('../controllers/techController')

const authMiddleware = require('../middleware/authMiddleware')
const activatedMiddleware = require('../middleware/activatedMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const techRouter = new Router()

techRouter.post('/help', authMiddleware, techController.help)

module.exports = techRouter