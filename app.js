const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const User = require('./modles/user');
const Expense = require('./modles/expense');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', userRoutes);
app.use('/', expenseRoutes);

User.hasMany(Expense)//, { foreignKey: 'userId' });
Expense.belongsTo(User)//, { foreignKey: 'userId' });


sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error(`Database sync error`, err));
