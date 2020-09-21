/* 
函数柯里化的作用主要是为了延迟加载
1.传入一个待curry化的函数fn以及初始参数arg
2.返回一个函数
    函数执行时,传入参数arg1
    2.1 获取函数的参数 (arg,arg1)
    如果 参数的满足某个条件 执行fn
    否则 返回一个带有arg+arg1的参数的fn 即curry(fn,arg+arg1) 即步骤1
*/
function sum(a, b, c) {
  console.log(a, b, c);
}
function curry(fn, ...arg) {
  return (...arg1) => {
    // 条件可以修改
    if (fn.length <= [...arg, ...arg1].length) {
      console.log("--------满足条件，执行----------");
      fn(...arg, ...arg1);
    } else {
      return curry(fn, ...arg, ...arg1);
    }
  };
}
let currySum = curry(sum);
let fn = currySum(2)(3);
fn(4);
currySum(1)(2)(3);
// 函数柯里化

// 在函数的参数没有满足某个条件时，返回原函数，满足条件时，执行函数
// 参数固定
function add(a, b, c) {
  return a + b + c;
}
// 参数不固定
function add1(...arg) {
  return arg.reduce((a, b) => a + b);
}
function curry(fnToCurry) {
  let arg = [];
  return function f(...arg1) {
    // arg = arg.concat(arg1);
    if (arg1.length) {
      arg = [...arg, ...arg1];
      return f;
    } else {
      //   return fnToCurry(...arg);
      let val = fnToCurry(...arg);
      arg = [];
      return val;
    }
  };
}
function curryFixParams(fnToCurry) {
  return (f = (...arg) =>
    arg.length === fnToCurry.length
      ? fnToCurry.apply(this, arg)
      : (...arg1) => f(...arg, ...arg1));
}
let curryAdd = curry(add1);
let sum = curryAdd(1)(2)(5)(4)(90)();
let curryAdd1 = curryFixParams(add);
let sum1 = curryAdd1(1, 2, 3);
console.log(sum);
console.log(sum1);
