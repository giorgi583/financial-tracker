const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const transactionsRouter = require('./routes/transactionsRoute');
const sequelize = require('./utils/db');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/transactions', transactionsRouter);

sequelize.sync()
    .then(() => {
        console.log('Database synced successfully');
    })
    .catch((error: string) => {
        console.error('Error syncing database:', error);
    });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});