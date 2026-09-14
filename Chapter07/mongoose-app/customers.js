const mongoose = require("mongoose");
// 你的连接地址，如果有账号密码记得URL编码，跟上 authSource=admin
// const URI = "mongodb://localhost:27017/customers";
const URI = "mongodb://admin:Mongo%40123456@127.0.0.1:27017/?authSource=admin";


// 定义 Schema（新版推荐显式写 Schema，model第二个参数传schema）
const customerSchema = new mongoose.Schema({
  forename: String,
  surname: String,
});
const Customer = mongoose.model("Customer", customerSchema);

// 封装主函数，使用async await控制执行顺序
async function main() {
  try {
    // mongoose9 不需要任何 options 参数
    await mongoose.connect(URI);
    console.log("✅ Mongoose connected");

    // 创建并保存文档
    const customer1 = new Customer({
      forename: "Beth",
      surname: "Griggs",
    });
    const doc = await customer1.save();
    console.log("Added new customer:", doc.forename, doc.surname);

    // 查询全部客户
    await listCustomers();

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    // 查询完成之后统一关闭连接，不要写在forEach循环内！
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
  }
}

async function listCustomers() {
  console.log("Customers:");
  const customers = await Customer.find();
  customers.forEach((customer) => {
    console.log(`- ${customer.surname}, ${customer.forename}`);
  });
}

// 启动入口
main();
