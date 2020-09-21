// 递归解法
// 当n>2时，值为前面两个数之和
// 当n<2时，值为n
function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(0));

//动态规划
function fib2(n) {
  let array = new Array(n + 1).fill(null);
  array[0] = 0;
  array[1] = 1;
  for (let i = 2; i < n + 1; i++) {
    array[i] = array[i - 1] + array[i - 2];
  }
  return array[n]
}
let result = fib2(10);
console.log(result);
