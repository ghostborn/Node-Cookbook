const { MongoClient } = require("mongodb");
const task = process.argv[2];

// const URI = "mongodb://admin:Mongo@123456@127.0.0.1:27017/?authSource=admin";
// @ 转义成 %40
const URI = "mongodb://admin:Mongo%40123456@127.0.0.1:27017/?authSource=admin";

async function main() {
  // 新版不需要 useUnifiedTopology
  const client = await MongoClient.connect(URI);
  const tasks = client.db("tasklist").collection("tasks");

  if (task) {
    await tasks.insertOne({ task });
    console.log("New Task: ", task);
    const docs = await tasks.find().toArray();
    docs.forEach((doc) => console.log(doc));
  } else {
    const docs = await tasks.find().toArray();
    docs.forEach((doc) => console.log(doc));
  }
  client.close();
}

main().catch((err) => {
  console.error(err);
});
