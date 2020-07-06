
// 输入一个数组和targe，从数组中找到 满足a+b = targe 的组合

function selectNum(arr, target) {
    const newArr = arr.sort((a, b) => a - b);
    let length = newArr.length -1;
    const res = []
    console.log(newArr)
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
[2,3,3,4,5]

console.log(selectNum([2,3,4,5,3],6));