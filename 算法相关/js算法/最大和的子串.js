// 最大子序列和
// let arr = [-10, 23, -1, 5, 40, -50];
// function fn(arr) {
//   let max = arr[0];
//   let preSum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     preSum = Math.max(arr[i],preSum + arr[i])
//     max = Math.max(preSum,max)
//   }
//   return max;
// }
// console.log(fn(arr));

/***
 *  给数组 arr = [-10,23,-1,5,40,-50]
 *  求这个数组的最大和 连续子串
 *
 */

function maxSubArray(arr) {
  let max = 0;
  let preSum = 0;

  let right = 0;
  let left = 0;
  if (arr.filter((item) => item > 0).length === 0) {
    arr.sort((a, b) => b - a);
    return [arr[0], arr[0]];
  }
  for (let i = 0; i < arr.length; i++) {
    if (preSum < 0) {
      preSum = arr[i];
      left = i;
    } else {
      preSum = preSum + arr[i];
    }
    if (preSum > max) {
      max = preSum;
      right = i;
    }
  }
  console.log(left, right);
  return [arr.slice(left, right + 1), max];
}

// 分治法

function maxSubArray111(arr) {}

let arr = [20,-10, 23, -1, -5, 10, -50, 100];

// O(n2) 的实现
function maxSubArrayA(arr) {
  let res = {};
  // 先找到 以 i为开头 的，最大和子数组
  for (let i = 0; i < arr.length; i++) {
    let max = arr[i];
    let right = i;
    let sum = 0;
    for (let j = i + 1; j < arr.length; j++) {
      sum += arr[j];
      if (max + sum > max) {
        max = max + arr[j];
        right = j;
      }
    }
    if (!res.max || res.max < max) {
      res = {
        subArr: arr.slice(i, right + 1),
        max: max,
      };
    }
  }
  //   console.log(maxArr)
  return res;
}
console.log(maxSubArrayA(arr));
