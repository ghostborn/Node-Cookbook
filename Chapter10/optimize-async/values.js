const { MongoClient } = require("mongodb");
// @ 转义成 %40
const URI = "mongodb://admin:Mongo%40123456@127.0.0.1:27017/?authSource=admin";

let values = [];
const numberOfValue = 1000;

let count = 0;
for (count; count < numberOfValue; count++) {
  values.push({ value: Math.round(Math.random() * 100000) });
}

MongoClient.connect(URI, (err, client) => {
  if (err) throw err;
  const db = client.db("data");
  db.collection("values").insertMany(values, (err) => {
    if (err) throw err;
    console.log(`Added ${numberOfValues} random values.`);
    client.close();
  });
});
