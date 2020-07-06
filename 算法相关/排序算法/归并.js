//  时间复杂度 nlogn  空间复杂度 n


// 将两个有序的数组进行merge为有序
function merge(left, right) {
  let result = [];
  console.log('-------------')
  console.log(left, right);
  console.log('-------------')

  while (left.length > 0 && right.length > 0) {
    if (left[0] > right[0]) {
      result.push(right.shift());
    } else {
      result.push(left.shift());
    }
  }
  return [...result, ...left, ...right];
}

// 数组切分
function mergeSort(arr) {
  // 递归终止条件
  if (arr.length <= 1) return arr;
  // 将当前数组一份为二，进行每组排序
  let middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  console.log("left:", left, "right:", right);
  return merge(mergeSort(left), mergeSort(right));
}

const arr = [20, 34, 5, 1, -2, 1100, 99, 1200, 4500];
console.log(mergeSort(arr));
