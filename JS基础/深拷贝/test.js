// 深拷贝
// 检测数据类型
function mYtypeof(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
function deepCopy(arr) {
  if (typeof arr !== "object") return arr;
  let res = mYtypeof(arr) === 'Array' ? []:{};

  for (let item in arr) {
    if (arr.hasOwnProperty(item)) {
      if (typeof arr[item] === 'object') {
        if (mYtypeof(arr[item]) === "Function") {
            res[item] = new Function(`return ${arr[item].toString()}`)
          continue
        }
        res[item] = deepCopy(arr[item]);
      } else {
        res[item] = arr[item];
      }
    }
  }
  return res;
}

var json1 = {
    "name": "鹏哥", "age": 18, "arr1": [1, 2, 3, 4, 5], "string": 'afasfsafa', "arr2": [1, 2, 3, 4, 5], "arr3": [{ "name1": "李鹏" }, { "job": "前端开发" }]
    , [Symbol('dad')]: 123,
    'function': fn,
};
function fn () {
    console.log('fn函数')
}
let json2 = deepCopy(json1)
json2.arr1[0] = '看我修改'
console.log('--------------')
console.log(json2);
json2.function()
console.log('--------------')
console.log(json1)
console.log(mYtypeof([]))


