// Question 1: Odd Number Filter & Square
// Write a function that takes an array of numbers and returns a new array containing only odd numbers, squared.

// Example Input:
// [1, 2, 3, 4, 5]
// Expected Output:
// [1, 9, 25]

function filterAndSquare(numbers) {
    if (!Array.isArray(numbers)) throw "Invalid input, input should be Array of numbers.";

    let flag = numbers.filter((number) => !Number.isInteger(number));

    if (flag.length != 0) throw "Invalid array elements, Array must contain Number values.";

    let output = numbers.filter((number) => number % 2 != 0);

    return output.map((number) => number**2);
}               

function main() {
    try{
        let ans = filterAndSquare([1, 2, 3, 4, 5]);
        console.log(ans);
    }
    catch (err) {
        console.error(err);
    }
}

main()