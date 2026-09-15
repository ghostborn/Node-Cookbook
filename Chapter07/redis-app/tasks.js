const redis = require("redis");
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});
const task = process.argv[2];

client.on("error", (err) => {
  console.log("❌ Redis Error:", err);
});

client.on("connect", () => {
  console.log("✅ Redis connect event");
});

client.on("ready", () => {
  console.log("✅ Redis ready, start run logic");
  if (!task) {
    listTasks();
  } else {
    addTask(task);
  }
});

client.connect((err) => {
  if (err) {
    console.log("❌ Failed to connect redis", err);
  }
});

function addTask(task) {
  const key = `Task:${Math.random().toString(32).replace(".", "")}`;
  console.log("📝 addTask, key=", key, "task=", task);
  // redis@6 callback 版本：hSet(key, hashObj, callback)
  client.hSet(key, { task: task }, (err) => {
    if (err) throw err;
    console.log(`✅ Added task key: ${key}`);
    listTasks();
  });
}

function listTasks() {
  console.log("🔍 listTasks start");
  client.keys("Task:*", (err, keys) => {
    if (err) throw err;
    console.log("🔑 found keys:", keys);
    if (keys.length === 0) {
      console.log("No tasks");
      client.quit();
      return;
    }
    let count = 0;
    keys.forEach((key) => {
      client.hGetAll(key, (err, item) => {
        if (err) throw err;
        console.log("📄 task item:", item);
        count++;
        if (count === keys.length) {
          console.log("✅ all tasks printed, quit redis");
          client.quit();
        }
      });
    });
  });
}
