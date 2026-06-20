const sequelize = require('../utils/db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resetPasswordToken: {
  type: DataTypes.STRING,
  allowNull: true,
},

resetPasswordExpires: {
  type: DataTypes.DATE,
  allowNull: true,
},
});

module.exports = User;