/**
 * @description: quicksort
 * @param {start,end}
 * @return {Array}
 */
function quickSort(A, start, end) {
  // 如果长度为一，直接返回
  if (start >= end) {
    return;
  }
  let partitionIndex = partition(A, start, end);
  quickSort(A, start, partitionIndex - 1);
  quickSort(A, partitionIndex + 1, end);
}
/**
 * @description:根据一个值将数组分为大于这个值和小于这个值两部分
 * @param {type}
 * @return {partitionIndex}
 */
function partition(A, start, end) {
  // 设置参考值,设置为最后一个
  let partitionValue = A[end];
  let i=start;
  while (start < end) {
    // 如果比参考值小，则交换两个值
    if (A[start] <= partitionValue) {
      swap(A, i, start); 
      i++;
    } 
    start++; 
  }
  // 交换A[i]和partitionValue
  swap(A, i, end);
  return i; 
}
/**
 * @description: 交换函数
 * @param {type}
 * @return {type}
 */
function swap(A, a, b) {
  let tmp = A[b];
  A[b] = A[a];
  A[a] = tmp;
}
let A=[];
for(let i=0;i<100;i++){
    A.push(Math.floor(Math.random(0,1)*100))
}
quickSort(A, 0, A.length - 1);
console.log(A);
