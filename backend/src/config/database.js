require('dotenv').config();
const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const testConnection = async () => {
    //test connention
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = testConnection;
