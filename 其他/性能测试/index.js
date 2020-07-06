
var Benchmark = require('benchmark');

// 测试函数运行时间
// !无用版
function testRunTime(fn,...args) {
    const start = Date.now()

    const res =  fn(...args)
    // console.log(res,'函数结果')
    const end = Date.now()

    console.log('此函数'+fn.name + '执行的时间:',end - start)
}


// 使用工具测试

const bench = new Benchmark(
    'foo test',
    selectNum,
    {}
)
console.log(bench.hz,'测试结果')
// 输入一个数组和targe，从数组中找到 满足a+b = targe 的组合
function selectNum() {
    const arr = [ ...new Array(10000).keys()].map(item => item + 1)
    const tartge = 10000
    const newArr = arr.sort((a, b) => a - b);
    let length = newArr.length -1;
    const res = []
    for (let i = 0; i < length; i++) {
        if(newArr[i] + newArr[length] === target) {
            res.push([newArr[i],newArr[length]])
        }
        if(newArr[i] + newArr[length] > target) {
            length --;
            i--;
        }
    }
    return res
}
