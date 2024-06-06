const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Role = sequelize.define("role",{ 
    value: { 
        type: DataTypes.STRING, 
        defaultValue: 'USER'
    }
})

module.exports = Role