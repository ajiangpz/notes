/* 

1.在用户停止动作的规定时间内触发函数
2.用户操作后，启动定时器
3.定时器结束后，调用函数
*/

function debounce(fn, delay) {
  let timer;
  return function () {
    timer = setTimeout(() => {
      fn();     
    }, delay);
    // 什么会执行
  };
}
