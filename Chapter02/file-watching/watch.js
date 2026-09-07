const fs = require("fs");
const file = "./file.txt";
const moment = require("moment");

fs.watch(file, (eventType, filename) => {
  const time = moment().format("YYYY-MM-DD hh:mm:ss");
  return console.log(`${filename} updated ${time}`);
});
