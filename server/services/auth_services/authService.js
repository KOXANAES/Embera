const User = require('../../models/User')
const Role = require('../../models/Role')
const UserDto = require('../../dtos/userDto')
const ApiError = require('../../exceptions/api-error')
const tokenService = require('./tokenService')
const mailService = require('./mailService')
const gMailService = require('./gmailService')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

class AuthService { 
    async registration(email, password, username) { 
        const candidate = await User.findOne({where:{email:email}})
        if (candidate) { 
            throw ApiError.BadRequest(`Пользователь с email ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const userRole = await Role.findOne({where:{value:"USER"}})
        const user = await User.create({email, username, password:hashPassword, activationLink, role:userRole.dataValues.value})  
        // await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { 
            ...tokens, 
            user: userDto
        }
    }
    async sendMail(email) {
        const user = await User.findOne({where:{email:email}})
        if(user.isActivated) throw ApiError.EmailError()
        const mailTemplate = user.dataValues.email
        const activationLink = user.dataValues.activationLink
        console.log(activationLink)
        if(mailTemplate.includes('@mail.ru')) {
            await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)
        }
        if(mailTemplate.includes('@gmail.com')) {
            await gMailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)
        }
        return 'activation link has been sended'
    }
    async activate(activationLink) { 
        const user = await User.findOne({where:{activationLink}})
        if(!user) { 
            throw new Error('Некорректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }
    async login(email, password) { 
        const user = await User.findOne({where:{email:email}})
        if(!user) { 
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals) { 
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { 
            ...tokens, 
            user: userDto
        }
    }
    async logout(refreshToken) { 
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken) { 
        if(!refreshToken) { 
            throw new Error(`В запросе не найден токен`)
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb) { 
            throw new Error('Не найдены токены из userdata либо БД')
        }
        console.log(userData)
        const userId = userData.id
        console.log(userData.id)
        const user = await User.findByPk(userId)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { 
            ...tokens, 
            user: userDto
        }
    }
    async users() { 
        const users = await User.findAll()
        return users
    }
    async destroyUser(email, password, refreshToken) {                              // стоит ли проверять, если и так отрабатывает checkIsAuth ??? 
        const user = await User.findOne({where:{email:email}})
        if(!user) { 
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals) { 
            throw ApiError.BadRequest('Неверный пароль')
        }
        await tokenService.removeToken(refreshToken)
        await User.destroy({where:{email:email}})
        return 'user destroyed'
    }
    async destroyUserFromAdm(email, refreshToken) {                              // стоит ли проверять, если и так отрабатывает checkIsAuth ??? 
        const user = await User.findOne({where:{email:email}})
        if(!user) { 
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }

        const id = user.id
        console.log(id)
        await tokenService.removeTokenFromAdm(id)
        await User.destroy({where:{email:email}})
        return 'user destroyed by admin'
    }
    async changeUsername(email, password, newUsername) { 
        const user = await User.findOne({where:{email:email}})
        if(!user) { 
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals) { 
            throw ApiError.BadRequest('Неверный пароль')
        }

        user.username = newUsername
        await user.save()

        return ({user})
    }
    async changePassword(email, password, newPassword) { 
        const user = await User.findOne({where:{email:email}})
        if(!user) { 
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals) { 
            throw ApiError.BadRequest('Неверный пароль')
        }
        const hashNewPassword = await bcrypt.hash(newPassword, 3)

        user.password = hashNewPassword
        await user.save()

        return ({user})
    }
}

module.exports = new AuthService()
