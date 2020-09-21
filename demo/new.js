// 实现一个new方法
// 原理
// 参数:构造函数,返回值一个__proto__属性指向构造函数原型对象的对象,将构造函数的上下文环境指定为该对象
function newFn(fn, ...arg) {
  var obj = Object.create(fn.prototype);
  fn.call(obj, ...arg);
  return obj;
}
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayName = function () {
  console.log(`My name is ${this.name},I am ${this.age} years old.`);
};

var p1 = newFn(Person, "xiaoming",12);
p1.sayName();
