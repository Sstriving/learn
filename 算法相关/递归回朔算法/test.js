// 学习递归回朔算法

/*****
 * 实例一 
 * 有这样三个数组
 * 
 * let names = ["iPhone X", "iPhone XS"]
 * let colors = ["黑色", "白色"]
 * let storages = ["64g", "256g"]
 * 
 * 需要将他们的组合穷举出来，最终会得到这样一个数组
 * 
 * [
    ["iPhone X", "黑色", "64g"],
    ["iPhone X", "黑色", "256g"],
    ["iPhone X", "白色", "64g"],
    ["iPhone X", "白色", "256g"],
    ["iPhone XS", "黑色", "64g"],
    ["iPhone XS", "黑色", "256g"],
    ["iPhone XS", "白色", "64g"],
    ["iPhone XS", "白色", "256g"],
   ]
 * 
 */

function consoleBAL(arr) {
  let res = [];
  let temp = [];
  const backFn = (index, temp) => {
    if (temp.length === arr.length) {
      res.push(temp);
      return;
    }
    if (index >= arr.length) {
      return;
    }
    for (let i = 0; i < arr[index].length; i++) {
      temp.push(arr[index][i]);
      console.log("------------");
      console.log(temp, "temp");
      console.log("------------");

      backFn(index + 1, [...temp]);
      temp.pop();
    }
  };

  backFn(0, temp);
  return res;
}

// ["iPhone X", "黑色", "64g"],

let arr = [
  ["iPhone X", "iPhone XS"],
  ["黑色", "白色"],
  ["64g", "256g"],
];
let res = consoleBAL(arr);
console.log(res, "结果");
