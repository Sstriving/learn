// 实现一个CodingMan，可以按照以下方式调用:
// CodingMan(“Hank”)输出:
// Hi! This is Hank!

// CodingMan(“Hank”).sleep(10).eat(“dinner”)
// 输出
// Hi! This is Hank!
// 等待10秒..
// Wake up after 10
// Eat dinner~

// CodingMan(“Hank”).eat(“dinner”).eat(“supper”)
// 输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// CodingMan(“Hank”).sleepFirst(5).eat(“supper”)
// 输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supperi
// 以此类推。

// 事件循环中的 顺序执行
function fn(str) {
  setTimeout(() => {
    console.log("Hi! This is " + str);
  }, 0);
}

// 遇到就延时
fn.prototype.sleep = function (time) {
  let curTime = Date.now();
  setTimeout(() => {
    while (Date.now() - curTime < time * 1000) {}
    console.log("Wake up after " + time);
  }, 0);

  return this;
};

fn.prototype.eat = function (str) {
  setTimeout(() => {
    console.log("Eat " + str);
  }, 0);
  return this;
};

// 先延时
fn.prototype.sleepFirst = function (time) {
  let curTime = Date.now();
  while (Date.now() - curTime < time * 1000) {}
  console.log("Wake up after " + time);
  return this;
};
function CodingMan(str) {
  return new fn(str);
}
CodingMan("Hank").sleep(10).sleepFirst(5).eat("dinner");
