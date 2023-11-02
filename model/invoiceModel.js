const { Sequelize } = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectOptions: {
            ssl: {
                ca: fs.readFileSync('/etc/pki/tls/certs/ca-bundle.crt'),
            },
        },
    }
);


(async () => {
    try {
        await sequelize.authenticate();
        console.log('database connection successful');
    } catch (error) {
        console.log('database connection failed', error);
    }
})();


module.exports = { sequelize }





