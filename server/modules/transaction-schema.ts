const sequelize = require('../utils/db');
const {DataTypes} = require('sequelize');

const Transaction = sequelize.define('transaction', {
    type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Transaction;