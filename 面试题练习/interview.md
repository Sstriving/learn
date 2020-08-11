前端面试题（知识边界考察）
====
### 1. CSS（10分）
- rem/em/vw
- 盒模型
- BFC
- 垂直居中的方法

### 2. JS （20分）
- var、let、const


- 作用域
```
var name = 'World!'; 
(function () {  
  if (typeof name === 'undefined') {    
    var name = 'Jack';    
    console.log('Goodbye ' + name);  
  } else { 
    console.log('Hello ' + name);  
  } 
})();
```
  
- 闭包（定义和形成过程）

- 原型
- this
```
function A(){this.name='a';}

function B(){this.name='b';}

A.prototype.getName = function() {return this.name;}

B.prototype.getName = function() {return this.name;}

A.prototype = new B;

const c = new A;

c.getName();
```

- event loop



### 3. HTTP （10分）
- 同源
- cookie和session的区别
- CDN

### 4. 浏览器 （10分）
- 跨域
- 页面加载和解析过程
- 动画方案对比
```
setInterval(() => {
  // domDiv.style.left += 10;
}, 100);
```


### 5. 服务端 （10分）
- 实践和经验考察

### 6. 安全 （10分）
- 常见的Web攻击
  - HTTP劫持
  - DOS攻击
  - XSS
  - CSRF
  - 接口防刷

### 7. 优化 （10分）
- 如何进行性能优化？
- 页面加载速度优化？  
  - CDN、HTTP请求数量、压缩、分包、懒加载、缓存、SSR 

### 8. 框架 （15分）
- React
   - virtual dom
   - key
   - 函数式组件和类组件
- Vue
  - 数据绑定原理
  - Vue3
- Angular
  - 1和2的区别 
  - 如何监测的事件的触发
  - 依赖反转
  - 装饰器
  - TS的优势
- 三大框架的对比

### 9. 计算机原理 （10分）
- 线程和进程的区别
- CPU和GPU的区别

### 10. Coding （15分）
- 数组去重（3种方法）
- 斐波那契函数
- debounce函数


滴滴
介绍下自己项目、从业务场景到算法解决方案
深拷贝原理及使用场景

coding部分
写一个（react/vue）目录组件，要求数据从父组件传入，两层目录，默认展开，支持收起。
redux实现原理
防抖函数
计算一个dom树的高度（层级数）
node部分
node做过哪些事，多进程如何处理
如何保证node服务稳定性，监控是怎么做的