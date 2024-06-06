const jwt = require('jsonwebtoken')
const Token = require('../models/Token')
class TokenService { 
    generateTokens(payload) { 
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {expiresIn:'15m'})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {expiresIn:'30m'})
        return { 
            accessToken, 
            refreshToken
        }
    }

    validateAccessToken(token) { 
        try { 
            const userData = jwt.verify(token, process.env.ACCESS_SECRET)
            return userData
        } catch(e) { 
            return null
        }
    }

    validateRefreshToken(token) { 
        try { 
            const userData = jwt.verify(token, process.env.REFRESH_SECRET)
            return userData
        } catch(e) { 
            return null
        }
    }

    async saveToken(userId, refreshToken) { 
        const tokenData = await Token.findOne({where:{user:userId}})
        if(tokenData) { 
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({user:userId, refreshToken})
        return token
    }
    async removeToken(refreshToken) { 
        const tokenData = await Token.destroy({where:{refreshToken:refreshToken}})
        return tokenData
    }
    async findToken(refreshToken) { 
        const tokenData = await Token.findOne({where:{refreshToken}}) //!
        return tokenData
    }
}

module.exports = new TokenService()