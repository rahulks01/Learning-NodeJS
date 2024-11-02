const fs = require("fs");

/******  Synchronus Call  ******/
fs.writeFileSync("./test.txt", "Hello World!!");

const result = fs.readFileSync("./contacts.txt", "utf-8");
console.log(result);

fs.appendFileSync("./test.txt", `${Date.now()} Hey There\n`);

fs.cpSync("./test.txt", "./copy.txt");

fs.unlinkSync("./copy.txt");

console.log(fs.statSync("./test.txt"));

fs.mkdirSync("my-docs");
fs.mkdirSync("my-docsss/a/b", { recursive: true });

/*******  Asynchronus Call  *******/
fs.writeFile("./test2.txt", "Hello World Async", (err) => {});

fs.readFile("./contacts.txt", "utf-8", (err, result) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log(result);
  }
});

// Note : The file handling is not allowed in JavaScript due to
//        security reasons but NodeJS provides an inbuilt 'fs' module to
//        to work with the file systems
