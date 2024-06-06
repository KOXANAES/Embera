const ApiError = require("../exceptions/api-error")
const checkIsAuth = require("./checkIsAuth")

module.exports = function(req,res,next) { 
    try { 
        const Authresults = checkIsAuth(req)
        if (!Authresults.isAuth) return next(ApiError.UnauthorizedError())
        const userData = Authresults.userData
        req.user = userData
        next()
    } catch { 
        return next(ApiError.UnauthorizedError())
    }
}