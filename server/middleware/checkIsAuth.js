const tokenService = require('../services/auth_services/tokenService')
const ApiError = require('../exceptions/api-error')

module.exports = checkIsAuth = (req) => {  
    try { 
        const authorizationHeader = req.headers.authorization
        const accessToken = authorizationHeader.split(' ')[1]
        const userData = tokenService.validateAccessToken(accessToken)
        
        let isAuth

        if(authorizationHeader && accessToken && userData) { 
            isAuth = 1  
        } else if(!authorizationHeader || !accessToken || !userData) { 
            isAuth = 0
        }

        return { 
            isAuth,
            userData
        }

    } catch(e) { 
        return next(ApiError.UnauthorizedError())
    }
}