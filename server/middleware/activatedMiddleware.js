const ApiError = require("../exceptions/api-error")
const checkIsAuth = require("./checkIsAuth")

const activatedMiddleware = (req,res,next) => { 
        try { 
                const Authresults = checkIsAuth(req)
                const userData = Authresults.userData
                const isActivated = userData.isActivated
                if(!isActivated) { 
                        return next(ApiError.InactivatedError())
                }
                next()
        } catch { 
                return next(ApiError.UnauthorizedError())
        }
}

module.exports = activatedMiddleware