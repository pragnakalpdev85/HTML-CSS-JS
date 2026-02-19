// 5. Employee Salary Analyzer
// You are given an array of employee objects:[
//   { id: 1, name: "Amit", salary: 40000, department: "IT" },
//   { id: 2, name: "Neha", salary: 55000, department: "HR" },
//   { id: 3, name: "Rahul", salary: 30000, department: "IT" },
//   { id: 4, name: "Priya", salary: 70000, department: "Finance" }
// ]
// Calculate:
// Total salary
// Average salary
// Find:
// Find by department

// Create a new object where:
// Key = department name
// Value = total salary of that department

// Rules
// Do not use .map(), .filter(), .reduce()

// Update
// Update Name Neha to Rita
// Delete
// Delete employee where id is 3

function calculateTotalSalary(listOfEmployees){
    let totalSalary = 0

    for (let employee of listOfEmployees){
        totalSalary += employee.salary;
    }

    return totalSalary;
}

function averageSalary(listOfEmployees) {
    let totalSalary = calculateTotalSalary(listOfEmployees);
    return totalSalary / listOfEmployees.length;
}

function findByDepartment(listOfEmployees, department) {
    let emps = []
    for (let employee of listOfEmployees){
        if (employee.department == department) {
            emps.push(employee);
        }
    }

    return emps
}

function updateName(listOfEmployees, name, newName){
    for (let employee of listOfEmployees){
        if (employee.name == name) {
            employee.name = newName;
        }
    }

    return listOfEmployees
}

function deleteById(listOfEmployees, id){
    let index = 0

    for (let employee of listOfEmployees){
        if (employee.id == id) {
            listOfEmployees.splice(index,1);
            break;
        }
        index++;
    }

    return listOfEmployees;
}

function validate(listOfEmployees) {

    if (!Array.isArray(listOfEmployees)) throw "Invalid input, input should be an Array of Objects.";
    if (listOfEmployees.length == 0) throw "Array is empty"
    for (let employee of listOfEmployees) {
        if (!('id' in employee || 'name' in employee || 'salary' in employee || 'department' in employee)){
            throw "Invalid data in employee array, Every employee must have id, name, salary and department";
        }

        if (typeof employee.id != 'number') throw "Invalid id, Every employee's id should be a number";
        if (typeof employee.name != 'string') throw "Invalid name, Every employee's name must be a string";
        if (typeof employee.salary != 'number') throw "Invalid salary, Every employee's salary should be a number";
        if (typeof employee.department != 'string') throw "Invalid department, Every employee's department must be a string";
    }

    return true
}

function main() {
    let emps = [
      { id: 1, name: "Amit", salary: 40000, department: "IT" },
      { id: 2, name: "Neha", salary: 55000, department: "HR" },
      { id: 3, name: "Rahul", salary: 30000, department: "IT" },
      { id: 4, name: "Priya", salary: 70000, department: "Finance" }
    ];

    try {
        let flag = validate(emps);
        if (flag) {
            let totalSalary = calculateTotalSalary(emps)
            console.log("Total Salary: ",totalSalary)

            let avgSalary = averageSalary(emps)
            console.log("Average Salary: ",avgSalary)

            let dept = findByDepartment(emps,'IT')
            console.log("Employees in IT department: ", dept)

            let newlist = updateName(emps, 'Neha', 'Rita')
            console.log("New list of employees with updated name, Neha -> Rita: ", newlist)

            newlist = deleteById(emps, 1)
            console.log("New list with deleted employee with ID 1: ",newlist)
        }
    }catch (err) {
        console.error(err);
    }


}

main()
