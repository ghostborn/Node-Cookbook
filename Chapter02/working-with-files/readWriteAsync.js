const fs = require("fs");
const path = require("path");

const filepath = path.join(process.cwd(), "hello.txt");

fs.readFile(filepath, "utf8", (err, contents) => {
  if (err) {
    return console.error(err);
  }
  console.log("File Contents:", contents);
  const lowerContents = contents.toLowerCase();
  fs.writeFile(filepath, lowerContents, (err) => {
    if (err) throw err;
    console.log("File updated.");
  });
});
