// a.b.c.d
function _get(obj, path, defaultValue) {
  // 不考虑数组的情况
  let paths = path.split(".");
  let result = obj;
  for (let p of paths) {
    // 为了防止result不是对象报错
    result = Object(result)[p];
        if (result == undefined) {
        return defaultValue;
    }
  }
  return result;
}
console.log(_get({ a: { b: { c: 1 } } }, "a.b.c.d", 2));
