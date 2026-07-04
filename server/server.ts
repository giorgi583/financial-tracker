const express = require('express');
import './relations';
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./utils/db');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3700;
app.use(cookieParser());
// routes
const transactionsRouter = require('./routes/transactionsRoute');
const usersRouter = require('./routes/usersroute');
const userPrefferencesRouter = require('./routes/userPrefferencesRoute');
const dashboardRouter = require('./routes/dashboardRoute');
const budgetRouter = require('./routes/budgetRoute');
const goalRouter = require('./routes/goalRoute');

// middleware and routes
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.json());
app.use('/api/transactions', transactionsRouter);
app.use('/api/budgets', budgetRouter);
app.use('/api/users', usersRouter);
app.use('/api/user-prefferences', userPrefferencesRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/goals', goalRouter);

// sync database and start server
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch((error: string) => {
        console.error('Error syncing database:', error);
    });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});