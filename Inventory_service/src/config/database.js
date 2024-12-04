require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'your_db_username',
    password: process.env.DB_PASSWORD || 'your_db_password',
    database: process.env.DB_NAME || 'shop_inventory',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
  }
};
