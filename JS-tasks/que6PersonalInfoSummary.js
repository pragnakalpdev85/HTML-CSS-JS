// Question 6: Personal Information Summary
// Description:
// Create a small program that stores basic personal information and prints a readable summary.

// Core features:
// Store a person’s name, age, and student status
// Calculate how old the person will be after 5 years
// Display all details in a clear sentence
// Add explanations for the logic in the code

function printDetails(person) {
    console.log("Name: ",person.name)
    console.log("Age: ",person.age)
    console.log("Student Status: ",person.status)
    console.log("Person's age after 5 years: ", person.age + 5)
}

function main(){
    const prompt = require("prompt-sync")({ sigint: true });

    let person = {
        name: String,
        age: Number,
        status: String
    }
    person.name = prompt("Enter Person's name: ");

    while(true) {
        try{
            let age = Number(prompt("Enter Person's Age: "))
            if (age <= 0){
                throw ""
            }
            
            person.age = age
            break;

        }catch(err){
            console.error("Invalid input, Age should be a positive integer.")
        }
    }

    person.status = prompt("Enter Person's Student status: ")

    printDetails(person)
}

main();