const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectModule: require('mysql2'),
        pool: {
            max: 5,
            min: 0,
            idle: 1000,
            handleDisconnects: true
        }
    });

module.exports = { sequelize }





