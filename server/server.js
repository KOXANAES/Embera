require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT
const sequelize = require('./models/sequelize')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./routers/authRouter')
const calcRouter = require('./routers/calcRouter')
const errorMiddleware = require('./middleware/errorMiddleware')

app.use(express.json())
app.use(cookieParser())
app.use(cors({ 
    credentials: true, 
    origin: process.env.CLIENT_URL      
}))
app.use('/auth', authRouter)
app.use('/calc', calcRouter)
app.use(errorMiddleware)

const start = async () => { 
    try { 
        sequelize.sync()
            .then(() => {console.log('БД синхронизирована')})
            .catch((e) => {console.log(e)})
        app.listen(PORT, () => {console.log(`Приложение работает, порт ${PORT}`)})
    } catch(e) { 
        console.log(e)
    }
}
start()