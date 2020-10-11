/**
 * @description: 排序函数,递归
 * @param {type}
 * @return {type}
 */
function mergeSort(A) {
  if (A.length <= 1) {
    return A;
  }
  let len = A.length;
  let middle = Math.floor(len / 2);
  let left = A.slice(0, middle);
  let right = A.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}
/**
 * @description: 归并函数,将两个有序的数组合并为一个有序的数组
 * @param {type}
 * @return {type}
 */
function merge(A, B) {
  let result = [];
  while (A.length && B.length) {
    if (A[0] <= B[0]) {
      result.push(A.shift());
    } else {
      result.push(B.shift());
    }
  }
  result = result.concat(A).concat(B);
  return result;
}
let A = [];
for (let i = 0; i < 100; i++) {
  A.push(Math.floor(Math.random(0, 1) * 100));
}
let result = mergeSort(A);
console.log(result);
