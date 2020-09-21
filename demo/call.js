function generateCode(argLen) {
  code = `return arguments[0][arguments[1]](`;
  for (let i = 0; i < argLen; i++) {
    if (i > 0) {
      code += ",";
    }
    code += `arguments[2][${i}]`;
  }
  code = `${code})`;
  return code;
}
Function.prototype.applyFn = function (context, argArray) {
  if (typeof this !== "function") {
    throw new TypeError(`${this} is not a function!`);
  }
  if (typeof argArray === undefined || typeof argArray === null) {
    argArray = [];
  }
  if (context === undefined || context === null) {
    context = window;
  }
  context = new Object(context);
  let __fn = +new Date().getTime();
  context[__fn] = this;
  // let result = context[__fn](...argArray);
  // 这里不使用ES6实现，可以使用
  let code = generateCode(argArray.length);
  let result = new Function(code)(context, __fn, argArray);
  delete context[__fn];
  return result;
};
function add(num) {
  return (this.a + this.b + this.c) * num;
}
let obj = {
  a: 1,
  b: 2,
  c: 3,
};
let sum = add.applyFn(obj, [2]);
console.log(sum);
