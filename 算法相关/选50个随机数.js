


// 生成一个50 个数的数组，要求50个数不重复，从小于100里取


// 方案一 时间复杂度不确定  
// function generate50randomNun() {
//     let arr = [];
//     for (let i = 0; i < 50; i++) {
//         let randomNum = Math.floor(Math.random() * 100);
//         while (arr.includes(randomNum)) {
//             randomNum = Math.floor(Math.random() * 100);
//         }
//         arr.push(randomNum);
//     };
//     return arr;
// }
// console.log(generate50randomNun());



// 方案二
// 并不完全随机

// function generate50randomNun() {
//     let arr = [...new Array(100).keys()];
//     return arr.sort(item => Math.random > 0.5);
// }
// console.log(generate50randomNun());



// 方案三  生成随机数
// fisher-yates
function generate50randomNun(n) {

    let arr = [...new Array(n).keys()].map(item => item + 1);
    let randomNum = 0;
    for (let i = arr.length - 1; i > 0; i--) {
        // 生产随机数 0 - arr.length
        randomNum = Math.floor(Math.random() * (i + 1));
        [arr[randomNum], arr[i]] = [arr[i], arr[randomNum]];
    }
    return arr;
}
console.log(generate50randomNun(100));
