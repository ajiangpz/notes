 (function(){
  var ArrayPrototypeSlice = Array.prototype.slice;
  Function.prototype.myBind = function(otherThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    // baseArgs指第一次传入的参数
    var baseArgs= ArrayPrototypeSlice.call(arguments, 1),
        baseArgsLength = baseArgs.length,
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          baseArgs.length = baseArgsLength; // reset to default base arguments
          //将第二次调用的参数加进来
          baseArgs.push.apply(baseArgs, arguments);
          // FNOP用来复制fToBound的原型对象，返回绑定的函数fBound时，需要将原型
          // 对象也拷贝到fBound的原型对象上
          // 函数原型是this的原型对象，说明是通过new调用，则this不变
          return fToBind.apply(
                 fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
          );
        };
    
    // 构造函数的原型
    if (this.prototype) {
      // 如果有原型，将原型拷贝下来
      fNOP.prototype = this.prototype; 
    }
    // 复制原来函数的原型对象，new绑定了FNOP函数的this到了fBound的this上
    fBound.prototype = new fNOP();

    return fBound;
  };
})();
function Person(name,age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHello = function () {
  console.log(`${this.name}今年${this.age}岁了`);
};
var o = {
  name: "xiaoming",
};
var fn = Person.myBind(o, '小明');
var p1=new fn(12);
p1.sayHello();
