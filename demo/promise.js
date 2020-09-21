/* 
1.调用函数参数
    try{fn}
    catch{
        reject(err)
    }
2.执行then函数时 接受成功回调函数，失败回调函数
    先判断这两个函数是否是函数 如果不是 需要手动定义两个函数
    如果当前状态是pending 先保存该函数，等到状态为resolve的时候，执行这些回调函数;
    如果是resolved 执行onFullfilled
    如果是rejectd 执行onReject

3.resolve,reject函数在构造函数内调用，需要绑定到构造函数的this
    resolve 设置状态为resolved 设置返回值 执行成功回调
    reject  设置状态为rejectd  设置返回值 执行失败回调

*/
const PENDING = "pending";
const REJECT = "reject";
const RESOLVED = "resolve";
class Promise {
  // 构造函数
  constructor(fn) {
    let that = this;
    this.state = PENDING;
    this.value = null;
    this.resolvedCallbacks = [];
    this.rejectdCallbacks = [];
    function resolve(value) {
      if (that.state === PENDING) {
        that.state = RESOLVED;
        that.value = value;
        that.resolvedCallbacks.map((cb) => cb(that.value));
      }
    }
    function reject(value) {
      if (that.state === PENDING) {
        that.state = REJECT;
        that.value = value;
        that.rejectdCallbacks.map((cb) => cb(that.value));
      }
    }
    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFullfilled, onRejected) {
    // 判断onFullfilled是否是函数
    onFullfilled = typeof onFullfilled === "function" ? onFullfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (v) => {
            throw v;
          };
    if (this.state === PENDING) {
      this.resolvedCallbacks.push(onFullfilled);
      this.rejectdCallbacks.push(onRejected);
    } else if (this.state === RESOLVED) {
      onFullfilled(this.value);
    } else if (this.state === REJECT) {
      onRejected(this.value);
    }
  }
}
