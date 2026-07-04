let income = Number(localStorage.getItem("income")) || 0;
let expense = Number(localStorage.getItem("expense")) || 0;

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

document.getElementById("income").innerText = "₹" + income;
document.getElementById("expense").innerText = "₹" + expense;
document.getElementById("balance").innerText =
"₹" + (income - expense);

transactions.forEach(function(item){

    let li = document.createElement("li");
    li.innerText = item.name + " - ₹" + item.amount;

    document.getElementById("list").appendChild(li);
});

document.getElementById("incomeBtn").addEventListener("click", function(){
    addTransaction("income");
});

document.getElementById("expenseBtn").addEventListener("click", function(){
    addTransaction("expense");
});

function addTransaction(type){

    let name = document.getElementById("name").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if(name.trim() === "" || isNaN(amount) || amount <= 0){
        alert("Enter valid details");
        return;
    }

    let transaction = {
        name: name,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    let li = document.createElement("li");
    li.innerText = name + " - ₹" + amount;

    document.getElementById("list").appendChild(li);

    if(type === "income"){
        income += amount;
    }
    else{
        expense += amount;
    }

    localStorage.setItem("income", income);
    localStorage.setItem("expense", expense);

    document.getElementById("income").innerText =
    "₹" + income;

    document.getElementById("expense").innerText =
    "₹" + expense;

    document.getElementById("balance").innerText =
    "₹" + (income - expense);

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
}