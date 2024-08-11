const authController = require('../controllers/authController')

const {body} = require('express-validator')

const Router = require('express')

const authMiddleware = require('../middleware/authMiddleware')
const activatedMiddleware = require('../middleware/activatedMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const authRouter = new Router()

authRouter.post('/registration', 
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('username').notEmpty(),
    body('password').isLength({min:4, max:32}),
    authController.registration)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)


authRouter.post('/sendMail', authMiddleware, authController.sendMail)

authRouter.get('/activate/:link', authController.activate)


authRouter.get('/refresh', authController.refresh)


// функция - костыль для создания ролей рользователя при первом запуске приложения (с пустой БД)
authRouter.get('/createUserRoles', authController.createUserRoles)

authRouter.get('/users', authMiddleware, activatedMiddleware, roleMiddleware(['ADMIN']), authController.users)
authRouter.put('/destroyUserFromAdm', authMiddleware, activatedMiddleware, roleMiddleware(['ADMIN']), authController.destroyUserFromAdm)

authRouter.put('/destroyUser', authMiddleware, authController.destroyUser)
authRouter.put('/changeUsername', authMiddleware, authController.changeUsername)
authRouter.put('/changePassword', authMiddleware, authController.changePassword)


// поменять почту 
// поменять пароль
module.exports = authRouter