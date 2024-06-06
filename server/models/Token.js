const {DataTypes} = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./User')

const Token = sequelize.define("token", {
user: {
    type: DataTypes.INTEGER,
    references: {
        model: User,
        key: 'id'
    }
},
refreshToken: { 
    type: DataTypes.STRING,
},
})

module.exports = Token