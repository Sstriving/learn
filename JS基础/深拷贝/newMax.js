/****************工具方法******************* */

function checkType(obj) {
  // Object.prototype.toString.call(obj) 会返回这个obj是什么类型，[object String]
  // slice(begin,end) end < 0的时候，表示在数组中倒数第几个元素结束 -1 是在 ] 前结束截取
  return Object.prototype.toString.call(obj).slice(8, -1);
}

// 判断对象的方法
function isObject(target) {
  const type = typeof target;
  return target !== null && (type === "object" || type === "function");
}

// 各种数据类型
const mapTag = "Map";
const setTag = "Set";
const arrayTag = "Array";
const objectTag = "Object";
const argsTag = "Arguments";

const boolTag = "Boolean";
const dateTag = "Date";
const numberTag = "Number";
const stringTag = "String";
const symbolTag = "Symbol";
const errorTag = "Error";
const regexpTag = "RegExp";
const funcTag = "Function";

// 需要深度遍历的类型
const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

// 获取实例
function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

function cloneSymbol(target) {
  return target
}

/****************工具方法******************* */

//1.考虑多种数据类型的版本
/*
  2.考虑循环引用 --- 如下，会直接栈溢出
  const target = {
      field1: 1,
      field2: undefined,
      field3: {
          child: 'child'
      },
      field4: [2, 4, 8]
  };
  target.target = target;
  解决办法 ： 额外开辟一个存储空间、来存储当前对象和拷贝对象的对应关系，
  当需要拷贝时，先去存储空间中找，看有没有拷贝过这个对象
  如果有，直接返回，如果没有继续拷贝
  */
// !问题2 先解决循环引用
function deepCloneMax1(target, map = new Map()) {
  if (!isObject(target)) return target;
  
  let copy = checkType(target) === "Array" ? [] : {};
  if (map.get(target)) {
    return map.get(target);
  }
  
  map.set(target, copy);

  for (let key in target) {
    if (!target.hasOwnProperty(key)) {
      continue;
    }
    if (typeof target[key] !== "object") {
      copy[key] = target[key];
    } else {
      copy[key] = deepCloneMax(target[key], map);
    }
  }
  return copy;
}

// !再解决问题1

// clone不需要遍历的类型
function cloneOtherType(target, type) {
  const Ctor = target.constructor;

  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return cloneReg(target);
    case symbolTag:
      return cloneSymbol(target);
    case funcTag:
      return cloneFunction(target);
    default:
      return null;
  }
}

function deepCloneMax2(target, map = new WeakMap()) {
  if (!isObject(target)) return target;

  // 初始化
  const type = checkType(target);
  let copy;
  if (deepTag.includes(type)) {
    copy = getInit(target);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.has(target)) {
    return map.get(target);
  }
  map.set(target, copy);

  // 克隆set
  if (type === setTag) {
    target.forEach((value, key) => {
      copy.add(key, deepCloneMax2(value, map));
    });
    return copy;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      copy.set(key, deepCloneMax2(value, map));
    });
    return copy;
  }

  // 处理key为 symbol的情况
  let symKeys = Object.getOwnPropertySymbols(target); // 查找
  if (symKeys.length) {
    // 查找成功
    symKeys.forEach((symKey) => {
      if (isObject(target[symKey])) {
        copy[symKey] = deepCloneMax2(target[symKey], map);
      } else {
        copy[symKey] = target[symKey];
      }
    });
  }
  // 克隆对象和数组
  for (let key in target) {
    if (!target.hasOwnProperty(key)) {
      continue;
    }
    copy[key] = deepCloneMax2(target[key], map);
  }
  return copy;
}
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
  [Symbol("dad")]: 123,
  1: Object(Symbol('adasdada'))
  
};
target.target = target;

const b = deepCloneMax2(target);
console.log(target);
console.log(b,'copy的一份');