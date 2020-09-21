// 递归解法
// 当n>2时，值为前面两个数之和
// 当n<2时，值为n
function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
