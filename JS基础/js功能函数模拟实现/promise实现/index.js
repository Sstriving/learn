// promise模拟实现

/****
 * 第一步 构造函数
 *
 * Promise构造函数接收一个executor函数，executor函数执行完同步或异步操作后，
 * 调用它的两个参数resolve和reject;
 *  */

// const promise = new Promise((resolve, reject) => {
//   // 如果操作成功 ，调用 resolve传入value
//   // 如果操作失败，调用 reject 传入 resion
// }).then((res) => {});

// 实现构造函数如下：

function Promise(exeutor) {
  let self = this;
  self.status = "pending"; // promise的当前状态
  self.data = undefined; // 当前值

  // promise resolve/reject 时的回掉函数集，
  // 因为在promise结束之前有可能有多个回掉函数添加到上面
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];

  const resolve = function (value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (self.status === "pending") {
        self.status = "resolved";
        self.data = value;
        self.onResolvedCallback.forEach((callback) => callback(value));
      }
    });
  };

  const reject = function (reason) {
    setTimeout(() => {
      if (self.status === "pending") {
        self.status = "rejected";
        self.data = reason;
        self.onRejectedCallback.forEach((callback) => callback(reason));
      }
    });
  };

  try {
    exeutor(resolve, reject);
  } catch (err) {
    console.log(err, "错误");
    reject(err);
  }
}

// then方法接收两个参数，onResolved、onRejected 分别为 promise成功或失败之后的回调
Promise.prototype.then = function (onResolved, onRejected) {
  let self = this;
  let primise2;
  // 需要处理，如果没有传函数的情况
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function (v) {
          return v;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (r) {
          return r;
        };
  console.log("看下then的状态", self.status, onResolved, onRejected);

  if (self.status === "resolved") {
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onResolved(self.data);
          console.log("--------------------");
          console.log("resolved状态", self.data);
          console.log("--------------------");

          if (x instanceof Promise) {
            x.then(resolve, reject);
          } else {
            resolve(x);
          }
        } catch (err) {
          reject(err);
        }
      });
    }));
  }

  if (self.status === "rejected") {
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          } else {
            resolve(x);
          }
        } catch (err) {
          reject(err);
        }
      });
    }));
  }

  if (self.status === "pending") {
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确实如何处理。
    // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
    // 逻辑本身跟第一个if块内的几乎一致，此处不做过多解释
    return (promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          let x = onResolved(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          } else {
            resolve(x);
          }
        } catch (e) {
           reject(e);
        }
      });

      self.onRejectedCallback.push(function (reason) {
        try {
          console.log(onRejected.toString(), "错误函数");
          let x = onRejected(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          } else {
            reject(x); // 错误的时候一定要reject
          }
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
};

// 为了下文方便，我们顺便实现一个catch方法
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

new Promise((resolve, reject) => {
  console.log("第一次resolve");
  //   resolve(1);
  resolve(1);
})
  // then1 这里传入的函数 会被放到调用者promise的回调数组中
  .then((res) => {
    console.log(res);
    resolve(2);
    // new Promise((resolve,reject) => {
    //     setTimeout(() => {
    //         resolve(res + 1)
    //     },500)
    // })
  })
  .then((res) => {
    console.log(res, "111");
  }).catch((err) => {
    console.log("报错1了", err);
  }).then(() => {},err => {
    console.log(err,'这个可以到吗')
  });
