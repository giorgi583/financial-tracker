const User = require('./modules/users-schema');
const Transaction = require('./modules/transaction-schema');
const UserPrefference = require('./modules/userPrefferences-schema');
const sequelize = require('./utils/db');


User.hasMany(Transaction, { foreignKey: 'userId', onDelete: 'CASCADE' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(UserPrefference, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserPrefference.belongsTo(User, { foreignKey: 'userId' });

User.addHook('afterCreate', async (user: any) => {
  await UserPrefference.create({ userId: user.id });
});

