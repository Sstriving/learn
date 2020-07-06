// 将一个数组进行展开  [1,2,3,[2,3,4],[2323],[3,3,5,[35,6]]]



function flatArr(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res = [...res, ...flatArr(arr[i])];
        } else {
            res.push(arr[i])
        }
    }
    return res;
}
console.log(flatten([1, 2, 3, [2, 3, 4], [2323], [3, 3, 5, [35, 6]]]));



// 方案二 ，利用Array.some 方法判断数组中item 是否还有是数组的
// 同时结构展开
const arr = [[[1, 2], [1, 2, 3, "a"]], [1, 2, "b"]]
function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        //如果当前数组中还有数组，则展开
        arr = [].concat(...arr)
    }
    return arr
}

// 方案三 利用立即执行函数，每次push
const eachFlat = (arr = []) => {
    const result = []; // 缓存递归结果
    // 开始递归
    (function flat(arr) {
        // forEach 会自动去除数组空位
        arr.forEach((item) => {
            if (Array.isArray(item)) {
                // 递归数组
                flat(item)
            } else {
                // 缓存元素
                result.push(item)
            }
        })
    })(arr)
    // 返回递归结果
    return result;
} 