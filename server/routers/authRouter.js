const authController = require('../controllers/authController')

const {body} = require('express-validator')

const Router = require('express')

const authMiddleware = require('../middleware/authMiddleware')
const activatedMiddleware = require('../middleware/activatedMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const authRouter = new Router()

authRouter.post('/registration', 
    body('password').isLength({min:4, max:32}),
    authController.registration)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.get('/activate/:link', authController.activate)
authRouter.get('/refresh', authController.refresh)
authRouter.get('/users', authMiddleware, activatedMiddleware, roleMiddleware(['ADMIN']), authController.users)
authRouter.get('/createUserRoles', authController.createUserRoles)


module.exports = authRouter