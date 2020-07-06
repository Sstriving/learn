// 参考： https://github.com/mqyqingfeng/Blog/issues/12

// 第一版
Function.prototype.bind2 = function (context) {
  var self = this;
  return function () {
    return self.apply(context);
  };
};

// 第二版
Function.prototype.bind2 = function (context, ...bindArgs) {
  var self = this;
  // 获取bind2函数从第二个参数到最后一个参数

  return function (...args) {
    // 这个时候的arguments是指bind返回的函数传入的参数
    return self.apply(context, [...bindArgs, ...args]);
  };
};

// 第三版
Function.prototype.bind2 = function (context, ...bindArgs) {
  var self = this;

  var fBound = function (...args) {
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(
      this instanceof fBound ? this : context,
      bindArgs.concat(args)
    );
  };
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  fBound.prototype = this.prototype;
  return fBound;
};

// 第四版
Function.prototype.bind2 = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

// 自己的es6版本
Function.prototype.mybind = function (context, ...bindArgs) {
  const self = this;
  const fBound = function (...args) {
    return self.apply(this instanceof fBound ? this : context, [
      ...bindArgs,
      ...args,
    ]);
  };
  fBound.prototype = Object.create(this.prototype);
  return fBound;
};

Function.prototype.myCreate = function (newFn) {
  let fn = new Function();
  fn.prototype = newFn;
  return new fn();
};
let foo = {
  value: 1,
};
function bar(name, age) {
  this.cc = 1;
  console.log(this.value);
  console.log(name, age);
}
bar.prototype.friend = "kevin";
const bindFoo = bar.mybind(foo, "liuxukang");
let obj = new bindFoo("asd");
console.log(obj.__proto__);
