const {DataTypes} = require('sequelize');
const sequelize = require('./sequelize')

const SbstConsts = sequelize.define("sbstconst", {
    testField: {
        type: DataTypes.STRING,
    }
})
module.exports = SbstConsts