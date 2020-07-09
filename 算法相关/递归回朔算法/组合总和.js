/*
给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

说明：

所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。 

示例 1:

输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
示例 2:

输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]
*/

function dfsFn(arr, target) {
  const res = [];
  const obj = {};
  arr.sort((a, b) => a - b);
  const back = (start, temp, target) => {
    // 判断是否有重复
    if (target === 0 && !obj[temp.join("")]) {
      res.push(temp);
      obj[temp.join("")] = true;

      return;
    }
    for (let i = start; i < arr.length; i++) {
      let curNum = arr[i];
      // 剪枝 如果剩余的值已经小于0了，则不用继续
      if (target - curNum < 0) {
        break;
      }
      back(i + 1, temp.concat(curNum), target - curNum);
    }
  };
  back(0, [], target);
  return res;
}

let arr = [10, 1, 2, 7, 6, 1, 5];
let target = 8;
console.log(dfsFn(arr, target));
