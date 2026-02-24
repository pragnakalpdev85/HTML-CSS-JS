const descriptionInput = document.getElementById('title-input');
const amountInput = document.getElementById('amount-input');
const categoryInput = document.getElementById('category-input');
const dateInput = document.getElementById('date-input');
const expenceContainer = document.getElementById('expenses')

const titleInputAlert = document.getElementById('alert-title-input');
const amountInputAlert = document.getElementById('alert-amount-input');
const categoryInputAlert = document.getElementById('alert-category-input');
const dateInputAlert = document.getElementById('alert-date-input');

const filterAlert = document.getElementById('alert-filter-input');

let editMode = false;

let addbtn = document.getElementById('addbtn');

const storage = window.localStorage

let expenses = JSON.parse(localStorage.getItem('expenses'))

function inputValidation(){
    let flag = true;

    if(amountInput.value == '' || amountInput.value == null){
        flag = false;
        amountInputAlert.className = 'alert-show';
    }else{
        amountInputAlert.className = 'alert';
    }

    if(categoryInput.value == '' || categoryInput.value == null){
        flag = false;
        categoryInputAlert.className = 'alert-show';
    }else{
        categoryInputAlert.className = 'alert';
    }

    if(descriptionInput.value == '' || descriptionInput.value == null){
        flag = false;
        titleInputAlert.className = 'alert-show';
    }else{
        titleInputAlert.className = 'alert';
    }

    if(dateInput.value == '' || dateInput.value == null){
        flag = false;
        dateInputAlert.className = 'alert-show';
    }else{
        dateInputAlert.className = 'alert';
    }

    if(!(amountInput.value == '' || amountInput.value == null)){
        if(Number(amountInput.value) <= 0){
            flag = false;
            amountInputAlert.innerHTML = 'Invalid Amount,It should be Positive Number';
            amountInputAlert.className = 'alert-show';
        }else{
            amountInputAlert.innerHTML = 'Amount field is required.';
            amountInputAlert.className = 'alert';
        }
    }

    if (!(dateInput.value == '' || dateInput.value == null)){
        let input = new Date(dateInput.value);
        let today = new Date();
        if(input > today){
            flag = false;
            dateInputAlert.innerHTML = 'Invalid date.';
            dateInputAlert.className = 'alert-show';
        }else{
            dateInputAlert.innerHTML = "Date field is required.";
            dateInputAlert.className = 'alert';
        }
    }

    if(!(descriptionInput.value == '' || descriptionInput.value == null)) {
        const regex = /^[^a-zA-Z0-9]+$/;
        const regex2 = /^\d+$/; 
        let test = regex.test(descriptionInput.value);
        let test2 = regex2.test(descriptionInput.value);
        if(test || test2){
            flag = false;
            titleInputAlert.innerHTML = "Title is invalid."
            titleInputAlert.className = 'alert-show';
        }else{
            titleInputAlert.innerHTML = "Title field is required.";
            titleInputAlert.className = 'alert';
        }
    }

    return flag;

}

function addExpenses(){

    if (!editMode && inputValidation()){
        obj = {
            title: descriptionInput.value,
            amount: amountInput.value,
            category: categoryInput.value,
            date: dateInput.value
        };
        descriptionInput.value = ''
        amountInput.value = null
        categoryInput.value = ''
        dateInput.value = null
    
        if (expenses == null) {
            storage.setItem('expenses',JSON.stringify([obj]));
            expenses = [obj]
        }else {
            expenses.push(obj);
            storage.setItem('expenses',JSON.stringify(expenses));
        }
        renderExpenses(expenses);
    }

}

function renderExpenses(expenses){
    let text = '';
    let totalAmount = 0;

    for (let index in expenses){
        let e = expenses[index];
        text += `
        <div class="expense" id="${index}">
            <div class="title-output">
                ${e.title}
            </div>
            <div class="category-output">
                ${e.category}
            </div>
            <div class="amount">
                <strong>$</strong>${e.amount}
            </div>
            <div class="date">
                ${e.date}
            </div>
            <div class="actions">
                <button id="edit-btn" onclick="editExpense(event)">Edit</button>
                <button id="delete-btn" onclick="deleteExpense(event)">Delete</button>
            </div>
        </div>
        `
        totalAmount += Number(e.amount);
    }

    text += `
    <div class="expense total">
        <div class="title-output">
        </div>
        <div class="category-output">
        </div>
        <div class="amount">
            Total : $${totalAmount}
        </div>
        <div class="date">
        </div>
        <div class="actions">
        </div>
    </div>
    `

    if(totalAmount == 0){
        text = `<div class="emptyMsg">No expenses recorded yet.</div>`;
    }
    expenceContainer.innerHTML = text;

    document.getElementById('amount-filter-input').value = '';
    document.getElementById('category-filter-input').value = ''; 
    document.getElementById('date-filter-input').value = ''

    document.getElementById('title-input').value = '';
    document.getElementById('amount-input').value = '';
    document.getElementById('category-input').value = '';
    document.getElementById('date-input').value = '';
    document.getElementById('expenses').value = '';
}

function deleteExpense(event) {
    if (!editMode){
        let flag = confirm('Are you sure you want to delete this expense?')
        if (flag){
            parentId = event.target.parentNode.parentNode;
            expenses.splice(Number(parentId.id), 1)
            renderExpenses(expenses)
            storage.setItem('expenses',JSON.stringify(expenses))
        }
    }
}

function editExpense(event){
    if (!editMode){

        let parentId = event.target.parentNode.parentNode;
        let id = Number(parentId.id);
    
        let edit = expenses[id];
    
        editMode = true
        
        parentId.innerHTML = `
        <div class="title-output">
            <input type="text" class="editinputs1" id="edit-title${id}" value="${edit.title}">
            <div class="alert" id="alert-edittitle-input${id}">Title field is required.</div>
        </div>
        <div class="category-output">
            <select name="category" class="editinputs2" id="edit-category${id}" value="${edit.category}">
                <option value="${edit.category}">${edit.category}</option>
                <option value="">Select Category</option>
                <option value="Housing & Utilities">Housing & Utilities </option>
                <option value="Food & Groceries">Food & Groceries </option>
                <option value="Transportation">Transportation</option>
                <option value="Healthcare & Personal Care">Healthcare & Personal Care</option>
                <option value="Debt & Financial Obligations">Debt & Financial Obligations</option>
                <option value="Lifestyle & Entertainment">Lifestyle & Entertainment</option>
                <option value="Clothing & Personal Items">Clothing & Personal Items</option>
                <option value="Family & Dependents">Family & Dependents</option>
                <option value="Savings & Investing">Savings & Investing</option>
                <option value="Giving & Miscellaneous">Giving & Miscellaneous</option>
            </select>
            <div class="alert" id="alert-editcategory-input${id}">Category field is required.</div>
        </div>
        <div class="amount">
            <input type="number" class="editinputs3" id="edit-amount${id}" value="${edit.amount}">
            <div class="alert" id="alert-editamount-input${id}">Amount field is required.</div>
        </div>
        <div class="date">
            <input type="date" class="editinputs4" id="edit-date${id}" value="${edit.date}">
            <div class="alert" id="alert-editdate-input${id}">Date field is required.</div>
        </div>
        <div class="actions">
            <button id="edit-done" onclick="doneEditing(event)">Save</button>
        </div>
        `;
    }
}

function editInputValidation(id){
    let editTitle = document.getElementById('edit-title'+ id).value;
    let editAmount = document.getElementById('edit-amount' + id).value;
    let editCategory = document.getElementById('edit-category' + id).value;
    let editDate = document.getElementById('edit-date' + id).value;

    let alertTitle = document.getElementById('alert-edittitle-input'+id);
    let alertAmount = document.getElementById('alert-editamount-input'+id);
    let alertCategory = document.getElementById('alert-editcategory-input'+id);
    let alertDate = document.getElementById('alert-editdate-input'+id);

    let flag = true;

    if (editTitle == '' || editTitle == null){
        flag = false;
        alertTitle.className = 'alert-show';
    }else {
        alertTitle.className = 'alert'
    }

    if (editAmount == '' || editAmount == null){
        flag = false;
        alertAmount.className = 'alert-show';
    }else {
        alertAmount.className = 'alert'
    }

    if (editCategory == '' || editCategory == null){
        flag = false;
        alertCategory.className = 'alert-show';
    }else {
        alertCategory.className = 'alert'
    }

    if (editDate == '' || editDate == null){
        flag = false;
        alertDate.className = 'alert-show';
    }else {
        alertDate.className = 'alert'
    }
    
    if(!(editAmount == '' || editAmount == null)){
        if(Number(editAmount) <= 0){
            flag = false;
            alertAmount.innerHTML = 'Invalid Amount,It should be Positive Number';
            alertAmount.className = 'alert-show';
        }else{
            alertAmount.innerHTML = 'Amount field is required.';
            alertAmount.className = 'alert';
        }
    }

    if (!(editDate == '' || editDate == null)){
        let input = new Date(editDate);
        let today = new Date();
        if(input > today){
            flag = false;
            alertDate.innerHTML = 'Invalid date.';
            alertDate.className = 'alert-show';
        }else{
            alertDate.innerHTML = "Date field is required.";
            alertDate.className = 'alert';
        }
    }

    if(!(editTitle == '' || editTitle == null)) {
        const regex = /^[^a-zA-Z0-9]+$/;
        const regex2 = /^\d+$/; 
        let test = regex.test(editTitle);
        let test2 = regex2.test(editTitle);
        if(test || test2){
            flag = false;
            alertTitle.innerHTML = "Title is invalid."
            alertTitle.className = 'alert-show';
        }else{
            alertTitle.innerHTML = "Title field is required.";
            alertTitle.className = 'alert';
        }
    }

    return flag
}

function doneEditing(event){
    let parentId = event.target.parentNode.parentNode;
    let id = Number(parentId.id);

    if (editInputValidation(id)) {
        let obj = {
            title : document.getElementById('edit-title'+ id).value,
            amount : document.getElementById('edit-amount' + id).value,
            category : document.getElementById('edit-category' + id).value,
            date : document.getElementById('edit-date' + id).value
        };
    
        expenses[id] = obj;
        storage.setItem('expenses',JSON.stringify(expenses));
        renderExpenses(expenses);   
        editMode = false;
    }
}

function renderFilters(indexArray){

    let text = ''
    let totalAmount = 0;

    for(let index in expenses){
        if (index in indexArray){
            let e = expenses[index];
            text += `
            <div class="expense" id="${index}">
                <div class="title-output">
                    ${e.title}
                </div>
                <div class="category-output">
                    ${e.category}
                </div>
                <div class="amount">
                    <strong>$</strong>${e.amount}
                </div>
                <div class="date">
                    ${e.date}
                </div>
                <div class="actions">
                    <button id="edit-btn" onclick="editExpense(event)">Edit</button>
                    <button id="delete-btn" onclick="deleteExpense(event)">Delete</button>
                </div>
            </div>
            `
            totalAmount += Number(e.amount);
        }
    }

    text += `
    <div class="expense total">
        <div class="title-output">
        </div>
        <div class="category-output">
        </div>
        <div class="amount">
            Total : $${totalAmount}
        </div>
        <div class="date">
        </div>
        <div class="actions">
        </div>
    </div>
    `

    if(totalAmount == 0){
        text = `<div class="emptyMsg">No expenses found for this filter.</div>`;
    }
    expenceContainer.innerHTML = text;
}

function filter(){
    let amount = document.getElementById('amount-filter-input').value;
    let category = document.getElementById('category-filter-input').value;
    let date = document.getElementById('date-filter-input').value;

    let expenseMap = {};
    for (index in expenses){
        expenseMap[Number(index)] = expenses[index];
    }
    
    if(!editMode){

        if(!(amount == '' || amount == null)){
            list = {}
        
            for (let index in expenseMap){
                exp = expenseMap[index];
                if (amount == exp.amount){
                    list[index] = expenseMap[index];
                }
            }

            
            expenseMap = list;
        }
        
        if(!(category == '' || category == null)){
            list = {}
            
            for (let index in expenseMap){
                exp = expenseMap[index];
                if (category == exp.category){
                    list[index] = expenseMap[index];
                }
            }
            
            
            expenseMap = list;
        }
        
        if(!(date == '' || date == null)){
            list = {}
            
            for (let index in expenseMap){
                exp = expenseMap[index];
                if (date == exp.date){
                    list[index] = expenseMap[index];
                }
            }
            
            expenseMap = list;
        }
    
        renderFilters(expenseMap);
    }

}

renderExpenses(expenses)