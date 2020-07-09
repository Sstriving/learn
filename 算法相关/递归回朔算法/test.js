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
  let prev = [];
  const backFn = (index, prev) => {
    if (prev.length === arr.length) {
      res.push(prev);
      return;
    }
    if (index >= arr.length) {
      return;
    }
    // 遍历数组里面的每一项内容
    for (let i = 0; i < arr[index].length; i++) {
      let temp = arr[index][i];
      // 这块concat很精髓，复制了一个数组出来，并且没有改变原prev数组
      backFn(index + 1, prev.concat(temp));
    }
  };

  backFn(0, prev);
  return res;
}

// ["iPhone X", "黑色", "64g"],

let arr = [
  ["iPhone X", "iPhone XS"],
  ["黑色", "白色"],
  ["64g", "256g"],
];
let res = consoleBAL(arr);
// console.log(res, "结果");

/****
 * 实例二 
 * N皇后 放棋盘
 * 给定一个整数n，返回所有不同的n皇后问题的解决方案
 * 方案中 'Q' 和 '.'分别代表皇后和空位
 * 例：
 *  输入: 4
    输出: [
        [".Q..",  // 解法 1
        "...Q",
        "Q...",
        "..Q."],

        ["..Q.",  // 解法 2
         "Q...",
         "...Q",
         ".Q.."]
    ]
 *  分析 ： 皇后之间不能相互攻击、则每一行、每一列、每条对角线只能有一个皇后
 *  用 columns 数组记录摆放过的列下标，摆放过后直接标记为 true 即可。
 *  用 dia1 数组记录摆放过的对角线 1下标，摆放过后直接把下标 rowIndex + columnIndex标记为 true 即可。
 *  用 dia2 数组记录摆放过的对角线 2下标，摆放过后直接把下标 rowIndex - columnIndex标记为 true 即可。
 *  递归函数的参数 prev 代表每一行中皇后放置的列数，比如 prev[0] = 3 代表第 0 行皇后放在第 3 列，以此类推。
 *  每次进入递归函数前，先把当前项所对应的列、对角线 1、对角线 2的下标标记为 true，带着标记后的状态进入递归函数。并且在退出本次递归后，需要把这些状态重置为 false ，再进入下一轮循环。
 *  有了这几个辅助知识点，就可以开始编写递归函数了，在每一行，我们都不断的尝试一个坐标点，只要它和之前已有的结果都不冲突，那么就可以放入数组中作为下一次递归的开始值。
 *  这样，如果递归函数顺利的来到了 rowIndex === n 的情况，说明之前的条件全部满足了，一个 n皇后 的解就产生了。把 prev 这个一维数组通过辅助函数恢复成题目要求的完整的「二维数组」即可。
 * 
*/

let solveNQueens = function (n) {
  const res = [];

  // 已摆放皇后的下标
  const columns = [];

  // 已摆放皇后的对角线1 下标 左下-> 右上
  // 计算某个坐标是否在这个对角线的方式是「行下标 + 列下标」是否相等
  const dia1 = [];

  // 已摆放皇后的对角线2 下标 左上-> 右下
  // 计算某个坐标是否在这个对角线的方式是「行下标 - 列下标」是否相等
  const dia2 = [];

  // 在选择当前的格子后，记录状态
  const record = (rowIndex, columnIndex, bool) => {
    columns[columnIndex] = bool;
    dia1[rowIndex + columnIndex] = bool;
    dia2[rowIndex - columnIndex] = bool;
  };

  // 尝试在一个n皇后问题中，摆放第index行内的皇后位置
  const putQueen = (rowIndex, prev) => {
    if (rowIndex === n) {
      res.push(generateBoard(prev));
      return;
    }
    // 尝试摆放第index行的皇后 尝试【0，n-1】列
    for(let i = 0; i < n; i++) {
      // 在列上不冲突
      const columnNotConflict = !columns[i]
      // 在对角线1上不冲突
      const dia1NotConflict = !dia1[rowIndex + i]
      // 在对角线2上不车冲突
      const dia2NotConflict = !dia2[rowIndex - i]

      // 如果在列、对角线都不冲突，则可以放皇后
      if(columnNotConflict && dia1NotConflict && dia2NotConflict) {
        // 记录当前位置，说明已经放了皇后
        record(rowIndex,i,true)
        // 进入下一轮递归
        putQueen(rowIndex +1, prev.concat(i))
        // 在递归出栈以后，在状态中清楚这个位置的记录，下一轮循环应该是一个全新的开始
        record(rowIndex,i,false)
      }
    }
  };

  putQueen(0, []);
  return res;
};
// 生成二维数组的方法
function generateBoard(row) {
  let n = row.length;
  let res = [];

  for (let y = 0; y < n; y++) {
    let cur = "";
    for (let x = 0; x < n; x++) {
      if (x === row[y]) {
        cur += "Q";
      } else {
        cur += ".";
      }
    }
    res.push(cur);
  }
  return res;
}
const n = 6
const test1 = solveNQueens(n)
console.log(test1,`${n}皇后的答案`)


// [ 
//   [ '.Q..', 
//     '...Q', 
//     'Q...', 
//     '..Q.' 
//   ],
//   [ '..Q.', 
//     'Q...', 
//     '...Q', 
//     '.Q..' 
//   ] 
// ] 