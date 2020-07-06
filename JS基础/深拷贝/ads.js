// 先写一个获取类型的函数

function getDataType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

function deepClone(data) {
  if (typeof data !== "object") {
    return data;
  }
  const res = getDataType(data) === "Array" ? [] : {};

  for(let i in data) {
    if(!data.hasOwnProperty(i)){
        continue;
    }
    if(typeof data[i] !== 'object' ){
        res[i] = data[i]
    }else {
        if(getDataType(data[i]) === 'Function') {
            res[i] = new Function(`return ${data[i].toString()}`)
            continue
        }
        res[i] = deepClone(data[i])
    }
  }
  return res;
}

let fn = function acc() {
    console.log('看这里是函数')
}
var json1 = {
    "name": "鹏哥", "age": 18, "arr1": [1, 2, 3, 4, 5], "string": 'afasfsafa', "arr2": [1, 2, 3, 4, 5], "arr3": [{ "name1": "李鹏" }, { "job": "前端开发" }]
    , [Symbol('dad')]: 123,
    'function': fn,
};


let json2 = deepClone(json1)
json2.arr1[0] = '改变'
console.log('json1',json1)
console.log('---------------')
console.log('json2',json2)



