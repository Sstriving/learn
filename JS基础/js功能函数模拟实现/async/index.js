// async await的 简单实现

const getData = () =>
  new Promise((resolve) => setTimeout(() => resolve("data"), 1000));

//   async实现
async function test() {
  const data = await getData();
  console.log("data: ", data);
  const data2 = await getData();
  console.log("data2: ", data2);
  return "success";
}

// generator函数表达实现。。需要一个asyncToGenerator
// 入参数为generator函数，返回一个promise
var test = asyncToGenerator(function* testG() {
  // await被编译成了yield
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return "success";
});

// 执行
test().then((res) => console.log(res));
