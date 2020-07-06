/******
 *
 *  js中能够被安全呈现/计算的最大整数是 2^53 -1 ,即 9007199254740991
 *  在ES6中被定义为Number.MAX_SAFE_INTEGER
 *  当计算的整数 不在 -9007199254740991 ～ 9007199254740991 范围内时，就会出现计算错误
 *  所以需要转为字符串计算，下面是实现方案：
 */


// 方案 一：手写转换方法

function maxNumberAdd(num1, num2) {
    if (Number.isSafeInteger(num1 * 1) && Number.isSafeInteger(num2 * 1) && Number.isSafeInteger(num1 * 1 + num2 * 1)) {
        return Number(num1) + Number(num2) + '';
    }
    let numArr1 = num1.split('');
    let numArr2 = num2.split('');
    var count = 0;
    let res = '';
    while (numArr1.length || numArr2.length || count) {
        count += ~~numArr1.pop() + ~~numArr2.pop();
        res = count % 10 + res;
        count = count > 9;
    }

    return res;
}

// 方案二：使用大数的声明  BigInt

let a = '1111111111102312313313';
let b = '99999999999999';


console.log(Number(a) + Number(b), '直接加');
console.log(maxNumberAdd(a, b), '使用函数加');
console.log(BigInt(a * 1) + BigInt(b * 1), '大数相加方案二');
