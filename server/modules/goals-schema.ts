const {DataTypes} = require('sequelize');
const sequelize = require('../utils/db');

const Goal = sequelize.define('Goal', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // name of the Users table
            key: 'id',
        },
    },
    type: {
        type: DataTypes.ENUM('Long_term_savings', 'monthly_savings', 'Cut_down_spending', 'Increase_monthly_income'),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    targetAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true, 
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    status: {
        type: DataTypes.ENUM('active', 'completed', 'failed'),
        defaultValue: 'active',
        allowNull: false,
    }
});

module.exports = Goal;