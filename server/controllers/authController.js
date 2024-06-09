const Role = require('../models/Role') // just for creating roles
const authService = require('../services/auth_services/authService')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')
const User = require('../models/User')
class AuthController { 
    async registration(req,res,next) { 
        try { 
            const errors = validationResult(req)
            if(!errors.isEmpty()) { 
                return next(ApiError.BadRequest('Ошибка при валидации', errors))
            }
            const {email, password, username} = req.body
            const userData = await authService.registration(email, password, username)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true})
            return res.json(userData)
        } catch(e) { 
            next(e)
        } 
    }
    async sendMail(req,res, next) { 
        try { 
            const {email, password} = req.body 
            const userData = await authService.sendMail(email, password)
            return res.json(userData)
        } catch(e) { 
            next(e)
        }
    }
    async activate(req,res, next) { 
        try { 
            const activationLink = req.params.link
            await authService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch(e) { 
            next(e)
        }
    }
    async login(req,res,next) { 
        try { 
            const {email, password} = req.body
            const userData = await authService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true})
            return res.json(userData)
        } catch(e) { 
            next(e)
        }
    }
    async logout(req,res, next) { 
        try { 
            const {refreshToken} = req.cookies
            const token = await authService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch(e) { 
            next(e)
        }
    }
    async refresh(req,res,next) { 
        try { 
            const {refreshToken} = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) 
            return res.json(userData)
        } catch(e) { 
            next(e) 
        }
    }
    async users(req,res,next) { 
        try { 
            const users = await authService.users()
            return res.json(users)
        } catch(e) { 
            next(e)   
        }
    }

    // Эта функция создана для того чтобы при запуске сервера
    // перед выполнением операций с пользователями, создать роли
    // пользователя

    async createUserRoles(req,res,next) { 
        try { 
            const userRole = new Role()
            const adminRole = new Role({value:"ADMIN"})
            await userRole.save()
            await adminRole.save()
            res.json('roles are created')
        } catch(e) { 
            next(e)   
        }
    }
    async destroyUser(req,res,next) { 
        try { 
            const {refreshToken} = req.cookies
            const {email, password} = req.body
            const response = await authService.destroyUser(email, password, refreshToken)
            res.clearCookie('refreshToken')
            res.json(response)
        } catch(e) { 
            next(e)   
        }
    }
    async destroyUserFromAdm(req,res,next) { 
        try { 
            const {email} = req.body
            const response = await authService.destroyUserFromAdm(email)
            res.json(response)
        } catch(e) { 
            next(e)   
        }
    }
    async changeUsername(req,res,next) { 
        try { 
            const {email, password, newUsername} = req.body
            const userData = await authService.changeUsername(email, password, newUsername)
            return res.json(userData)
        } catch(e) { 
            next(e)   
        }
    }
    async changePassword(req,res,next) { 
        try { 
            const {email, password, newPassword} = req.body
            const userData = await authService.changePassword(email, password, newPassword)
            return res.json(userData)
        } catch(e) { 
            next(e)   
        }
    }
}

module.exports = new AuthController()
