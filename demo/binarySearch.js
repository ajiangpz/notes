/*
 * @Author: your name
 * @Date: 2020-10-09 14:38:56
 * @LastEditTime: 2020-10-11 23:19:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \notes\demo\binarySearch.js
 */
function binarySearch(A, n, value) {
  let low = 0,
    high = n - 1,
    mid;
  while (low <= high) {
    mid = low + ((high - low) >> 1);
    if (A[mid] === value) {
      return mid;
    } else if (A[mid] > value) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}
// 变形
function binarySearch1(A, n, val) {
  let low = 0,
    high = n - 1,
    mid;
  while (low <= high) {
    mid = low + ((high - low) >> 1);
    if (A[mid] > val) {
      high = mid - 1;
    } else if (A[mid] < val) {
      low = mid + 1;
    } else {
      // 如果mid为0，或者mid的前面一个不等于val，说明是第一个
      if (mid === 0 || A[mid - 1] !== val) {
        return mid;
      } else {
        high = mid - 1;
      }
    }
  }
}
function binarySearch2(A, n, val) {
  let low = 0,
    high = n - 1,
    mid;
  while (low <= high) {
    mid = low + ((high - low) >> 1);
    if (A[mid] > val) {
      high = mid - 1;
    } else if (A[mid] < val) {
      low = mid + 1;
    } else {
      // 如果mid为n-1，或者mid的后面一个不等于val，说明是最后一个
      if (mid === n - 1 || A[mid + 1] !== val) {
        return mid;
      } else {
        low = mid + 1;
      }
    }
  }
}
function binarySearch3(A, n, val) {
  while (low <= high) {
    mid = low + ((high - low) >> 1);
    if (A[mid] >= val) {
      if (mid === 0 || A[mid - 1] < val) {
        return mid;
      } else {
        high = mid - 1;
      }
    } else {
      low = mid + 1;
    }
  }
  return -1;
}
function binarySearch4(A, n, val) {
    while (low <= high) {
      mid = low + ((high - low) >> 1);
      if (A[mid] <= val) {
        if (mid === n-1 || A[mid + 1] > val) {
          return mid;
        } else {
          high = mid - 1;
        }
      } else {
        low = mid + 1;
      }
    }
    return -1;
  }
let A = [1, 2, 3, 4, 4, 5, 6, 6, 6, 7, 7, 8, 9];
let index = binarySearch1(A, 9, 4);
console.log(index);
