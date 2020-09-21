/* 
1.第一次动作触发函数，后面的动作在规定时间内不会再触发函数
*/

function throttle(fn, delay) {
  let timer = null;

  return function () {
    // 什么时候调用这个fn
    // 1.第一次调用的时候
    // 2.规定的时间到了之后

    if (!timer) {
      fn();
      timer = setTimeout(() => {
        // fn();s
        timer=null;
      }, delay);
    }
  };
}
