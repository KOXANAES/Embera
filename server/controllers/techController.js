const User = require("../models/User")
const mailService = require("../services/auth_services/mailService")
const mailTechService = require("../services/auth_services/mailService")

class TechController { 
    async help(req,res,next) { 
        try {
            const {UserEmail, message} = req.body

            const admin = await User.findOne({where:{role:'ADMIN'}})
            const adminEmail = admin.email

            await mailTechService.sendTechHelpMessage(adminEmail, message, UserEmail)

            return res.json({message:'Ваше сообщение было отправлено администрации сервиса'})

        } catch(e) { 
            next(e)
        }
    }
}

module.exports = new TechController()