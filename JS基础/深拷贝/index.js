let obj = { [Symbol(11)]: 'abc', 'dadad': 1 }
let fn = function acc() {
    console.log('看这里是函数')
}
for (let i in obj) console.log(i)
console.log('---------------------------')
var json1 = {
    "name": "鹏哥", "age": 18, "arr1": [1, 2, 3, 4, 5], "string": 'afasfsafa', "arr2": [1, 2, 3, 4, 5], "arr3": [{ "name1": "李鹏" }, { "job": "前端开发" }]
    , [Symbol('dad')]: 123,
    'function': fn,
};
var json2 = {};
// function deepCopy(obj, newObj) {
//     var newObj = newObj || {};
//     for (let i in obj) {
//         if (!obj.hasOwnProperty(i)) {
//             continue;
//         }
//         if (typeof obj[i] === 'object') {
//             newObj[i] = (obj[i].constructor == Array) ? [] : {};
//             deepCopy(obj[i], newObj[i]);
//         } else {
//             newObj[i] = obj[i];
//         }
//     }
//     return newObj;
// }
// function deepClone(obj, newObj) {
//     if (typeof obj !== 'object') return obj;
//     var newObj = newObj || {};
//     for (let i in obj) {
//         if (typeof obj[i] === 'object') {
//             if (obj[i].constructor === Function) {
//                 newObj[i] = new Function(`return${obj[i].toString()}`)()
//                 continue;
//             }
//             newObj[i] = (obj[i].constructor === Array) ? [] : {};
//             deepClone(obj[i], newObj[i])
//         } else {
//             newObj[i] = obj[i];
//         }
//     }
//     return newObj

// }

function checkType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

function deepClone(target) {
    if (typeof target !== 'object') return target;
    const copy = checkType(target) === 'Array' ? [] : {};
    for (let i in target) {
        if (!target.hasOwnProperty(i)) {
            continue;
        }
        if (typeof target[i] === 'object') {
            if (checkType(target[i]) === 'Function') {
                copy[i] = new Function(`return ${target[i].toString()}`);
                continue;
            }
            copy[i] =  deepClone(target[i]);
        } else {
            copy[i] = target[i]
        }
    }
    return copy;
}

json2 = deepClone(json1);
json1.arr1[0] = '3213132';
json2.arr3[1].job = '后端开发';
console.log(1111, json1);
console.log(2222, json2);


