const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

const db = {};
module.exports = db;

db.initialize = initialize(); // Save the initialization promise

async function initialize() {
    // Create database if it doesn't exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // Connect to database
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // Init models and add them to db object
    db.User = require('../users/user.model')(sequelize);

    // Sync models
    await sequelize.sync({ alter: true });

    console.log('Database initialized.');
}
