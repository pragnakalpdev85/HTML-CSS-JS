// Question 3: Find the Second Largest Number
// Write a function that finds the second-largest number in an array.

// Example Input:
// [10, 5, 20, 8]
// Expected Output:
// 10

function secondLargest(numbers) {

    if (!Array.isArray(numbers)) throw "Invalid input, input should be an Array.";

    let flag = numbers.filter((number) => !Number.isInteger(number));

    if (flag.length != 0) throw "Invalid array elements, Array must contain Number values.";

    let output = numbers.sort((a, b) => b-a );

    return output[1];
}

function main() {
    try{
        let ans = secondLargest([10, 5, 20, 8]);
        console.log(ans);
    }
    catch (err) {
        console.error(err);
    }
}

main()