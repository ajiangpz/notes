/*
 * @Author: your name
 * @Date: 2020-10-19 20:10:29
 * @LastEditTime: 2020-10-19 20:52:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\demo.js
 */
// IP中四段要么是数字要么是*，并且*一定要在数字后面，以下是合法输入范例：
`
192.*.*.*
192.168.*.*
192.168.1.*
192.168.1.10
192.*.*.*
192.168.*.*
192.168.1.*
192.168.1.10
`;

/**
 * @param {String} text
 * @return {Boolean}
 */
function checkIfInputValid(text) {
  let resArr = text.split(".");
  let indexOfStar = resArr.length;
  if (resArr.length !== 4) {
    return false;
  }
  for (let i = 0; i < resArr.length; i++) {
    if (resArr[i].length > 3) {
      return false;
    }
    let ip = resArr[i];// '123'>12

    if (!isNaN(ip) && Number(ip) < 256 && Number(ip) >= 0) {
      if (i > indexOfStar) {
        return false;
      }
    } else if (resArr[i] === "*") {
      indexOfStar = i;
    } else {
      return false;
    }
  }
  return true;
}
console.assert(
  !checkIfInputValid("192.*.2.1"),
  "asterisk can't occur before number"
);
console.assert(checkIfInputValid("1.1.1.*"), "you're valid");
console.assert(!checkIfInputValid("269.1.1.*"), "269 exceed range");
console.assert(!checkIfInputValid("19a.2.001.1"), "alphabet can't occur");
console.assert(!checkIfInputValid("19.2.0001.1"), "segment can't be 0000");
console.assert(!checkIfInputValid("19.2"), "not valid ip");
