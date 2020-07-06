// 使用promise实现一个函数，传入参数arr，arr中都是promise，让按数组顺序执行

// function promiseCol(arr) {
//   if (arr.length === 0) return;
//   Promise.resolve(arr.shift()).then((res) => {
//     console.log(res);
//     promiseCol(arr);
//   });
// }

let arr = [
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(110);
    }, 10);
  }).then((res) => {
    return res;
  }),
  new Promise((resolve, reject) => {
    resolve(210);
  }).then((res) => {
    return res;
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(310);
    }, 1000);
  }).then((res) => res),
  new Promise((resolve, reject) => {
    resolve(410);
  }).then((res) => res),
];

promiseCol(arr);

// 使用 async awiat 再来一次

async function promiseCol(arr) {
  for (let i = 0; i < arr.length; i++) {
    await Promise.resolve(arr[i]).then((res) => {
      console.log(res);
    });
  }
}
