const fs = require("fs");
const path = require("path");

const filepath = path.join(process.cwd(), "hello.txt");
console.log(filepath, "filepath");

const contents = fs.readFileSync(filepath, "utf-8");
console.log("File Contents", contents);

const upperContens = contents.toUpperCase();

fs.writeFileSync(filepath, upperContens);
console.log("File updated.");
