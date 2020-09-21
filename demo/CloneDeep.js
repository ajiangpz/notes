/* 
1.对象有可能是数组和普通对象 通过instanceof判断
2.如果是普通对象，需要再次递归
3.如果是数组，复制数组的每一个元素
4.如果数组的元素为对象，同样递归
*/
function cloneDeep(obj) {
  let copyObj = obj instanceof Array ? [] : {};
  for (let i in obj) {
    // 如果是自身属性
    if (obj.hasOwnProperty(i)) {
      // 判断是否是对象
      if (typeof obj[i] === "object") {
        copyObj[i] = cloneDeep(obj[i]);
      } else {
        copyObj[i] = obj[i];
      }
    }
  }
  return copyObj;
}
let o = {
  a: 1,
  b: {
    c: {
      e: [1,2],
    },
    d: 2,
  },
};
let obj = cloneDeep(o);
console.log(obj)
console.log(o.b.c === obj.b.c);
