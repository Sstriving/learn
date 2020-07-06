// 20行简单版本

function Promise(excutor) {
  let self = this;
  self.data = undefined;
  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];
  const resolve = function (value) {
    setTimeout(() => {
      self.data = value;
      self.onResolvedCallbacks.forEach((callback) => callback(value));
    });
  };

  const reject = function (value) {
    setTimeout(() => {
      self.data = value;
      self.onRejectedCallbacks.forEach((callback) => callback(value));
    });
  };
  excutor(resolve, reject);
}

Promise.prototype.then = function (onResolved, onRejected) {
  let self = this;
  console.log("看下then的状态", onResolved);

  // 回调函数可能为空，或者不是函数
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function (v) {
          return v;
        };

  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (err) {
          return err;
        };

  return new Promise((resolve, reject) => {
    self.onResolvedCallbacks.push(() => {
      try {
        let x = onResolved(self.data);
        if (x instanceof Promise) {
          // 当返回值的promise的时候，执行一下then函数，
          // 将 resovle注册到onResolvedCallbacks数组中
          x.then(resolve);
        } else {
          resolve(x);
        }
      } catch (err) {
        reject(err);
      }
    });
    self.onRejectedCallbacks.push(() => {
      try {
        let x = onRejected(self.data);
        if (x instanceof Promise) {
          x.then(resolve);
        } else {
          resolve(x);
        }
      } catch (err) {
        reject(err);
      }
    });
  });
};

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve1
//     reject(1);
//   }, 500);
// })
//   .then(
//     (res) => {
//       console.log(res, "正常");
//     },
//     (err) => {
//       console.log(err, "异常");
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           resolve(err + 1);
//         }, 500);
//       });
//     }
//   )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("运行结果出错了", err);
//   });

// 可以穿透
new Promise((resolve) => resolve(8))
  .then()
  .then()
  .then(function foo(value) {
    console.log(value);
  });
