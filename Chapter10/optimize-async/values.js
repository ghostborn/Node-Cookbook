const { MongoClient } = require("mongodb");
// @ 转义 %40
const URI = "mongodb://admin:Mongo%40123456@127.0.0.1:27017/?authSource=admin";

async function seed() {
  const client = new MongoClient(URI);
  try {
    await client.connect();
    // ping 验证连接，卡住的时候这一步就会抛错
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB 连接成功");

    const values = [];
    const numberOfValue = 1000;
    for (let i = 0; i < numberOfValue; i++) {
      values.push({ value: Math.round(Math.random() * 100000) });
    }

    const db = client.db("data");
    const coll = db.collection("values");
    const res = await coll.insertMany(values);
    console.log(`✅ 成功插入 ${res.insertedCount} 条记录`);

  } catch (err) {
    console.error("❌ 错误：", err);
  } finally {
    await client.close();
    console.log("🔌 连接关闭");
  }
}

seed();
