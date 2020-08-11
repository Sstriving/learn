// console.log(1);

// async function foo1() {
//     console.log(2);
//     await console.log(3);
//     console.log(4);
// }
// setTimeout(() => {
//     console.log(5);
// }, 0);

// foo1();
// new Promise((resvole, reject) => {
//     console.log(6);
//     resvole();
// }).then(() => {
//     console.log(7);
// })
// console.log(8);

// 题2 头条

// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
// }
// async function async2() {
//   console.log("async2");
// }
// console.log("script start");
// setTimeout(function () {
//   console.log("setTimeout");
// }, 0);
// async1();
// new Promise(function (resolve) {
//   console.log("promise1");
//   resolve();
// }).then(function () {
//   console.log("promise2");
// });
// console.log("script end");

/****
 *  script start
 *  async1 start
 *  async2
 *  promise1
 *  script end
 *  async1 end
 *  promise2
 *  setTimeout
 */
console.log('---------------------')
//
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("timeout" + i);
  });
}
new Promise(function (resolve) {
  console.log("promise" + i);
  for (var i = 0; i < 1000; i++) {
    i == 99 && resolve();
  }
  console.log("promise" + i);
}).then(function () {
  console.log("then" + i);
});
console.log("global" + i);
