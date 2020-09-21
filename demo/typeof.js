/*
 * @Author: your name
 * @Date: 2020-09-08 23:24:10
 * @LastEditTime: 2020-09-12 19:41:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \notes\demo\typeof.js
 */
function throttle(fn, wait) {
  // 记录当前时间
  let prev = 0;
  let now = +new Date();
  let timeout = null;
  return function () {
    let context = this;
    let args = arguments;
    now = +new Date();

    // 下次可以触发回调的时间
    let remaining = now - prev - wait;
    if (remaining >= 0) {
      prev = now;
      timeout = null;
      fn.apply(context, args);
    }
    // 说明此时还在定时中并且没有定义定时器
    else if (!timeout) {
      timeout = setTimeout(() => {
        fn.apply(context, args);
        prev = now;
        timeout = null;
      }, -remaining);
    }
  };
}
