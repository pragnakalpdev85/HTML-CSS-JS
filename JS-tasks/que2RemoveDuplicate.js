// Question 2: Remove Duplicate Numbers
// Write a function that removes duplicate values from an array without using Set.

// Example Input:
// [1, 2, 3, 2, 4, 1, 5, 4]
// Expected Output:
// [1, 2, 3, 4, 5]

function removeDuplicate(numbers) {

    if (!Array.isArray(numbers)) throw "Invalid input, input should be an Array.";

    let output = new Set(numbers)
    numbers = []

    for (number of output) {
        numbers.push(number)
    }
    return numbers.sort()
}

function main() {
    try{
        let ans = removeDuplicate([1, 2, 3, 2, 4, 1, 5, 4]);
        console.log(ans);
    }
    catch (err) {
        console.error(err);
    }
}

main()