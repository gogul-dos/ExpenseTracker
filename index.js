document.addEventListener("DOMContentLoaded", () => {
    displayExpenses();
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

    const expense = { category, amount, date };
    
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";

    displayExpenses();
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
            <button onclick="deleteExpense(${index})">delete</button>
        `;
        expenseList.appendChild(expenseItem);
    });
}

function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}
