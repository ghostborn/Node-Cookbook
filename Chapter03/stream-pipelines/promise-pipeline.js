const fs = require("fs");
const { Transform } = require("stream");
const { pipeline } = require("stream/promises");
const path = require("path");

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

async function run() {
  try {
    await pipeline(
      fs.createReadStream(path.join(__dirname, "file.txt")),
      uppercase,
      fs.createWriteStream(path.join(__dirname, "newfile.txt")),
    );
  } catch (err) {
    console.error("Pipeline failed.", err);
  }
}

run();
