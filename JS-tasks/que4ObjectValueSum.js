// Question 4: Object Value Sum
// Write a function that sums only numeric values from an object.

// Example Input:
// { a: 10, b: "test", c: 20, d: true }
// Expected Output:
// 30

function objectValuesSum( obj ){

    let sum = 0;

    for (values in obj) {

        if (typeof obj[values] == 'number') {
            sum += obj[values];
        }
    }

    return sum;
}

function main() {
    let ans = objectValuesSum({ a: 10, b: "test", c: 20, d: true });
    console.log(ans);
}

main()