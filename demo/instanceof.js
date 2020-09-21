/* 
instanceof 的原理
判断某个对象是否是构造函数的实例
原理是判断构造函数的原型是否在某个对象的原型链上
*/

function _instanceOf(o, f) {
  var proto = o["__proto__"];
  var prototype = f.prototype;

  while (true) {
    if (proto === null) {
      return false;
    }
    if (proto === prototype) {
      return true;
    } else {
      proto = proto["__proto__"];
    }
  }
}
console.log([] instanceof Object);
console.log(_instanceOf([], Object));
