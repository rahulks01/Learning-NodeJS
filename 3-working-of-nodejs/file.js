const fs = require("fs");
const os = require("os");

//Find number of cores
console.log(os.cpus().length);

/****** Blocking... ******/
console.log("1");
console.log("2");

const result = fs.readFileSync("./contacts.txt", "utf-8");
console.log(result);

console.log("3");
console.log("4");

// // Output:
// 1
// 2
// Rahul Kumar Singh: +911212121212
// 3
// 4

/****** Non-Blocking... ******/
console.log("1");
console.log("2");

fs.readFile("./contacts.txt", "utf-8", (err, result) => {
  console.log(result);
});

console.log("3");
console.log("4");

// // Output:
// 1
// 2
// 3
// 4
// Rahul Kumar Singh: +911212121212

// Note: Should always write a code which is non-blocking
