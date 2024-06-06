const User = require('../models/User')
const Role = require('../models/Role')
const UserDto = require('../dtos/userDto')
const ApiError = require('../exceptions/api-error')
const tokenService = require('./tokenService')
const mailService = require('./mailService')
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
        await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { 
            ...tokens, 
            user: userDto
        }
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
}

module.exports = new AuthService()