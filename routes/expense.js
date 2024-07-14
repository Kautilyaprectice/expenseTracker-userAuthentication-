const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense');
const userAuthentication = require('../middleware/authenticate');

router.get('/expense',userAuthentication.authenticate, expenseController.getAllExpenses);
router.post('/expense', expenseController.createExpense);
router.delete('/expense/:id', expenseController.deleteExpense);

module.exports = router;
