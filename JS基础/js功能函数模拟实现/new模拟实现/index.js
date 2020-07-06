// new 模拟实现
function myNew(fn, ...args) {
  if (!(fn instanceof Function)) {
    throw "parm is not a Function";
  }
  // 创建一个新对象obj，并将 obj.__proto__ = fn.prototype
  let obj = Object.create(fn.prototype);

  // 执行fn。并改变this指向
  let res = fn.apply(obj, args);

  // 判断构造函数 是否返回了对象，如果返回不是对象，直接返回 obj
  return typeof res === "object" ? res : obj;
}

// 例子
function Persion(name, sex) {
  this.name = name;
  this.sex = sex;
  console.log(this, "this指向");
}

// let person2 = new Persion("李四", "女");
let person1 = myNew(Persion, "张三", "男");


