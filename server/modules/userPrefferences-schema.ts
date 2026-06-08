const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const UserPrefference = sequelize.define('userPrefferences', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',  // must match your User table name
            key: 'id'
        }
    },
    theme: {
        type: DataTypes.ENUM('light', 'dark'),
        allowNull: false,
        defaultValue: 'light',
    },
    color: {
        type: DataTypes.ENUM('blue', 'green', 'purple', 'orange'),
        allowNull: false,
        defaultValue: 'blue',
    },
    lang: {
        type: DataTypes.ENUM('en', 'ka'),
        allowNull: false,
        defaultValue: 'en',
    },
    currency: {
        type: DataTypes.ENUM('USD', 'EUR', 'GEL'),
        allowNull: false,
        defaultValue: 'USD',
    },
});

module.exports = UserPrefference;
    