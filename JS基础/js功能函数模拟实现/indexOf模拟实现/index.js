/****
 * 数组indexof模拟实现
 *  描述：indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
 *  入参：
 *      searchElement ： 要查找的元素
 *      fromIndex：开始查找的位置，如果 fromIndex < 0 ,则将其作为数组末尾的一个抵消，
 *      -2代表从倒数第二个元素查起  fromIndex >= arr.length 则直接返回-1
 * */

Array.prototype.MyIndexOf = function (searchEle, fromIndex = 0) {
  let len = this.length;
  if (len === 0) return -1;
  if (fromIndex >= len) return -1;

  if (fromIndex < 0 && fromIndex >= -len) {
    fromIndex = fromIndex + len;
  }
  if (fromIndex < -len) {
    fromIndex = 0;
  }
  for (let i = fromIndex; i < len; i++) {
    if (searchEle === this[i]) {
      return i;
    }
  }
  return -1;
};

let arr = [1, 2, 3, 5, 6];

// console.log(arr.MyIndexOf(3));

/****
 * 字符串indexof模拟实现
 *  描述：indexOf()方法返回在字符串中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
 *  入参：
 *      searchElement ： 要查找的元素
 *      fromIndex：开始查找的位置，如果 fromIndex < 0 ,则从0开始查找，
 *      fromIndex >= arr.length 则直接返回-1
 * */

String.prototype.MyIndexOf = function (searchEle, fromIndex = 0) {
  let data = this;
  let len = data.length;
  let strLen = searchEle.length;
  if (len === 0) return -1;
  if (searchEle === "") return Math.min(fromIndex, len);

  if (fromIndex < 0) {
    fromIndex = 0;
  }
  if (fromIndex > len.length) return -1;

  for (let i = fromIndex; i < len; i++) {
    if (searchEle === data.slice(i,i+strLen)) {
      return i;
    }
  }
  return -1;
};
let str = 'hello world'
console.log(str.MyIndexOf('ell'))
