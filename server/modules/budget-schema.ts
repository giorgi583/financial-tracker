const {DataTypes} = require('sequelize');
const sequelize = require('../utils/db');

const Budget = sequelize.define('budget', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',  // must match your User table name
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['userId', 'category'],
            msg: 'A budget for this category already exists for this user.'
        }
    ]
});

module.exports = Budget;