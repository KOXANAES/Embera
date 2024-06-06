const ApiError = require('../exceptions/api-error')
const User = require('../models/User')
const checkIsAuth = require('./checkIsAuth')

const roleMiddleware = (roles) => { 
    return async function (req,res,next) { 
        try { 
            const Authresults = checkIsAuth(req)
            const userData = Authresults.userData
            const userId = userData.id
            const user = await User.findByPk(userId)
            const userRole = user.dataValues.role
            let hasAccess = 0
            for(let i = 0; i <= roles.length; i++) { 
                if(userRole == 'ADMIN') {hasAccess = 1}
                if(userRole == roles[i]) { 
                    hasAccess = 1
                    console.log('Доступ получен')
                }
            }
            if(!hasAccess) return res.status(403).json({message:'У вас нет доступа к данной функции'})
            next()
        } catch(e) { 
            next(ApiError.UnknownError())   
        }
    }
}

module.exports = roleMiddleware