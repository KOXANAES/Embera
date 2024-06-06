const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    "embera", 
    "postgres", 
    "root", {
    dialect: "postgres",
    host: "localhost",
    define: { 
        timestamps:false
        }
    });

module.exports = sequelize
