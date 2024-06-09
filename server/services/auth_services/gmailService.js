const nodemailer = require('nodemailer')

class GMailService { 

    constructor() { 
        this.transporter = nodemailer.createTransport(
            { 
            host: process.env.SMTP_GMAIL_HOST,
            port: process.env.SMTP_GMAIL_PORT,
            secure: false,
                auth: { 
                    user: process.env.SMTP_GMAIL_USER,
                    pass: process.env.SMTP_GMAIL_PASSWORD
                }
            }
        )
    }
    async sendActivationMail(to, link) { 
        await this.transporter.sendMail({ 
            from: process.env.SMTP_GMAIL_USER,
            to, 
            subject: 'Активация аккаунта на + ' + process.env.CLIENT_URL,
            text: '', 
            html: 
                `
                    <div>
                        <h1>Для активации аккаунта перейдите по ссылке:</h1>
                        <a href='${link}'>${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new GMailService()