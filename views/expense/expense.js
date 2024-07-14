const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

function fetchExpenses() {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/expense', {headers: {'authorization': token}})
        .then((res) => {
            const expenses = res.data;
            expenseList.innerHTML = '';

            expenses.forEach((expense) => {
                appendExpenseToList(expense);
            });
        })
        .catch(err => {
            console.error('Error fetching expenses:', err);
        });
}

function appendExpenseToList(expense) {
    const listItem = document.createElement('li');
    listItem.textContent = `${expense.amount} - ${expense.description} - ${expense.category}  `;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Expense';
    deleteButton.onclick = () => {
        deleteExpense(expense.id);
    };

    listItem.appendChild(deleteButton);
    expenseList.appendChild(listItem);
}

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(expenseForm);
    const amount = formData.get('expenseAmount');
    const description = formData.get('description');
    const category = formData.get('category');

    axios.post('http://localhost:3000/expense', { amount, description, category })
        .then((res) => {
            fetchExpenses();
            expenseForm.reset();
        })
        .catch(err => {
            console.error('Error adding expense:', err);
        });
});

function deleteExpense(expenseId) {
    axios.delete(`http://localhost:3000/expense/${expenseId}`)
        .then((res) => {
            fetchExpenses();
        })
        .catch(err => {
            console.error('Error deleting expense:', err);
        });
}

window.onload = fetchExpenses;
