/** call 函数的模拟实现
 * 功能描述
 * Function对象上的函数，可以改变函数的this指向，并传参数执行
 * fn.call(context,args) , context 代表 改变的this指向，args执行函数的入参，可以有多个
 * 返回 原函数的返回值，如果 fn函数没有返回。则为 undefined
 *
 *
 *  */

//  使用es6版本
Function.prototype.myCall = function (context, ...args) {
  let context = context || window;
  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;

  return res;
};

// 不使用es6版本

Function.prototype.myCall = function (context) {
  let context = context || window;
  context.fn = this;

  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  const res = eval('context.fn("+args+")');
  delete context.fn;

  return res;
};
