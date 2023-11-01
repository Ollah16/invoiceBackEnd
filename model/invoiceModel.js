const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

module.exports = { sequelize }





