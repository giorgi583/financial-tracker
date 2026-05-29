import path from "path/win32";

const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env'), quiet: true });

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string, 10),
        dialect: process.env.DB_DIALECT as string,
    }
);

module.exports = sequelize;
