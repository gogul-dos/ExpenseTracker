document.addEventListener("DOMContentLoaded", () => {
    displayExpenses();
    updateTotalExpense();
});

const form = document.querySelector(".form-container");
const expenseList = document.querySelector(".expense-list");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;

    if (amount.trim() === "" || date.trim() === "") {
        alert("Please enter both amount and date!");
        return;
    }

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const editIndex = form.getAttribute("data-edit-index");
    if (editIndex !== null) {
        expenses[editIndex] = { category, amount, date };
        form.removeAttribute("data-edit-index");
    } else {
        expenses.push({ category, amount, date });
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";

    displayExpenses();
    updateTotalExpense();
});

function displayExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        let expenseItem = document.createElement("div");
        expenseItem.classList.add("expense-item");
        expenseItem.innerHTML = `
            <p>${expense.category}</p>
            <p>$${expense.amount}</p>
            <p>${expense.date}</p>
            <button  onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(expenseItem);
    });

    updateTotalExpense();
}

function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
    updateTotalExpense();
}

function editExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let expense = expenses[index];

    document.getElementById("category").value = expense.category;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("date").value = expense.date;

    form.setAttribute("data-edit-index", index);
}

function updateTotalExpense() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    
    document.getElementById("total-expense").textContent = `Total Expense: $${total}`;
}
