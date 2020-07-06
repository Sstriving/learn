/***
 * promise.all 方法的模拟实现
 *需要在浏览器里跑
 */

let promises = [Promise.reject(1),Promise.resolve(2)];
function promiseAll(promises) {
  return new Promise(function(resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("arguments must be an array"));
    }
    let resolvedCounter = 0;
    const promiseNum = promises.length;
    const resolvedValues = new Array(promiseNum);
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(
        value => {
          resolvedCounter++;
          resolvedValues[i] = value;
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues);
          }
        },
        err => reject(err)
      );
    }
  });
}

function promiseRace(promise) {
  return new promise((resolve, reject) => {
    for (let i = 0; i < promise.length; i++) {
      Promise.resolve(promises[i]).then(
        res => {
          return resolve(res);
        },
        err => {
          return reject(err);
        }
      );
    }
  });
}
console.log(promiseAll(promises));

// 题目：红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；
// 如何让三个灯不断交替重复亮灯？（用 Promse 实现）

function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}
let light = function(timer, cd) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cd();
      resolve();
    }, timer);
  });
};
function lightUpLood() {
  Promise.resolve()
    .then(() => light(3000, red))
    .then(() => light(1000, green))
    .then(() => light(2000, yellow))
    .then(() => lightUpLood());
}
lightUpLood()


function lightUpLood1() {
  let count = 0;
  setInterval(() => {
    count++
    if(count === 3) {
      red()
      count = 0
    }
  },1000)
}