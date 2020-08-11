let obj = { [Symbol(11)]: "abc", dadad: 1 };
let fn = function acc() {
  console.log("看这里是函数");
};
for (let i in obj) console.log(i);
console.log("---------------------------");
var json1 = {
  name: "鹏哥",
  age: 18,
  arr1: [1, 2, 3, 4, 5],
  string: "afasfsafa",
  arr2: [1, 2, 3, 4, 5],
  arr3: [{ name1: "李鹏" }, { job: "前端开发" }],
  [Symbol("dad")]: 123,
  a:Symbol(1),
  function: fn,
};
var json2 = {};

function checkType(obj) {
  // Object.prototype.toString.call(obj) 会返回这个obj是什么类型，[object String]
  // slice(begin,end) end < 0的时候，表示在数组中倒数第几个元素结束 -1 是在 ] 前结束截取
  return Object.prototype.toString.call(obj).slice(8, -1);
}

// 判断对象的方法
function isObject(target) {
  const type = typeof target;
  return target !== null && (type === "object" || type === "function");
}

// 只包含普通对象和 函数的情况
function deepClone(target) {
  if (!isObject(target)) return target;
  const copy = checkType(target) === "Array" ? [] : {};
  for (let i in target) {
    if (!target.hasOwnProperty(i)) {
      continue;
    }
    copy[i] = deepClone(target[i]);
  }
  return copy;
}

json2 = deepClone(json1);
json1.arr1[0] = "3213132";
json2.arr3[1].job = "后端开发";
console.log(1111, json1);
console.log(2222, json2);


