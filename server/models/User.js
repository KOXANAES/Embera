const {DataTypes} = require('sequelize');
const sequelize = require('./sequelize')

const User = sequelize.define("user", {
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
},
email: { 
    type: DataTypes.STRING,
    unique: true, 
    allowNull: false, 
},
username: { 
    type: DataTypes.STRING,
    allowNull: false, 
},
password: {
    type: DataTypes.STRING,
    allowNull: false, 
},
isActivated: { 
    type: DataTypes.BOOLEAN,
    defaultValue: false,
}, 
activationLink: { 
    type: DataTypes.STRING,
},
role: {
    type: DataTypes.STRING,
    allowNull: false,
}
});

module.exports = User