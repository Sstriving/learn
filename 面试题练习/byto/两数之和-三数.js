// 输入一个数组和targe，从数组中找到 满足a+b = targe 的组合

function selectNum(arr, target) {
  const newArr = arr.sort((a, b) => a - b);
  let length = newArr.length - 1;
  const res = [];
  console.log(newArr);
  for (let i = 0; i < length; i++) {
    if (newArr[i] + newArr[length] === target) {
      res.push([newArr[i], newArr[length]]);
    }
    if (newArr[i] + newArr[length] > target) {
      length--;
      i--;
    }
  }
  return res;
}
[2, 3, 3, 4, 5];

console.log(selectNum([2, 3, 4, 5, 3], 6));

/**
 * 给定一个整数数组 nums 和一个目标值 target，
 * 请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
 *
 *
 *  */

// !不同点，是找下标、且认为只有一个答案，不需要找组合
var twoSum = function (nums, target) {
  let obj = new Map();
  for (let i = 0; i < nums.length; i++) {
    let item = target - nums[i];
    if (obj.has(item)) {
      return [obj.get(item), i];
    } else {
      obj.set(nums[i], i);
    }
  }
};

/* 
三数之和
给你一个包含 n 个整数的数组 nums，
判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？
请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

 

示例：

给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
*/
console.log("---------------三数之和");

var threeSum = function (nums) {
  let res = [];
  if(nums == null || nums.length < 3) return res;
  let map = new Map();
  let temp;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    temp = nums[i];

    // 如果当前 > 0则一定不满足
    if (temp > 0) {
      break;
    }
    // 去重
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let length = nums.length - 1;
    for (let j = i + 1; j < length; j++) {
      const target = temp + nums[j] + nums[length];
      const strKey = "" + temp + nums[j] + nums[length];
      if (target === 0 && !map.has(strKey)) {
        map.set(strKey, true);
        res.push([temp, nums[j], nums[length]]);
      }
      if (target > 0) {
        length--;
        j--;
      }
    }
  }
  return res;
};
const nums = [-1, 0, 1, 2, -1, -4];
[-4, -1, -1, 0, 1, 2];
console.log(threeSum(nums));
