// 给定一个数组。如何实现按顺序请求每一个地址
// ['baidu.com','aliyun.com','aaaaa.com']

function fetchSyn(arr) {
  async function fn(arr) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      await window.fetch(arr[i]);
    }
  }
  fn(arr);
}

fetchSyn(["baidu.com", "aliyun.com"]);
