/***
 *  给定数组 arr =[1,2,-5,-3,5]
 *  求最大和的子数组 和 最大和
 *  输出
 *  res = { maxArr:[5],maxSum:5 }
 *
 */

//  时间复杂度 O(n^2)
function maxSubArr(arr) {
  let res = {};
  // 计算以 i为起始下标的最大子数组
  for (let i = 0; i < arr.length; i++) {
    let max = arr[i]; // 获取当前最大值 是数组当前第i位
    let sum = arr[i]; // 子数组和 也一样
    let right = i; // 需要截取的end下标
    // 遍历第二遍，找出第i位 为起始下标的数组 最大和
    for (let j = i + 1; j < arr.length; j++) {
      sum += arr[j];
      // 如果 求和后的值 大于 原先保存的max ，则代表以i为起始的最大和子数组需要更新
      if (max < sum) {
        right = j; // 跟新下标
        max = sum; // 更新最大值
      }
    }
    // 第一次进来，或者 比原先保存的最大值大
    if (!res.maxSum || res.maxSum < max) {
      res = {
        maxArr: arr.slice(i, right + 1),
        maxSum: max,
      };
    }
  }
  return res;
}

function maxSubArr(arr) {
  let res = {
    maxStr: [arr[0]],
    maxNum: arr[0],
  };
  let sum = arr[0];
  let left = 0;
  for (let i = 1; i < arr.length; i++) {
    if (sum < 0) {
      sum = arr[i];
      left = i;
    } else {
      sum += arr[i];
    }
    if (res.maxNum < sum) {
      res = {
        maxStr: arr.slice(left, i + 1),
        maxNum: sum,
      };
    }
  }
  return res;
}

const arr = [-1, 10, -4, 1, 2, 4, -5, 10,5, -3, 2];
console.log(maxSubArr(arr));
// 只求和
function maxSubNum(arr) {
  let max = arr[0];
  // dp[i] 定义为数组arr 中以arr[i] 结尾的最大连续子串和
  let dp = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    dp[i] = Math.max(dp[i - 1] + arr[i], arr[i]);
    if (max < dp[i]) {
      max = dp[i];
    }
  }
  return max;
}
